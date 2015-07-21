package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.BeforeAndAfterAll
import org.scalatest.FunSpecLike
import com.revveries.app.utils.DatabaseConnection
import com.revveries.app.utils.TestDatabaseConnection
import slick.driver.JdbcDriver.api._
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.{read, write}
import com.revveries.app.models.Tables

class GalleryServletSpec extends ScalatraSpec with FunSpecLike {
  
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)

  override def afterAll = {
    connection.close
    super.afterAll()
  }
  
  val connection = new TestDatabaseConnection(
    sys.props.getOrElse("JDBC_TEST_URI", default = sys.env("JDBC_TEST_URI")),
    sys.props.getOrElse("JDBC_TEST_BASE_URL", default = sys.env("JDBC_TEST_BASE_URL")),
    sys.props.getOrElse("JDBC_TEST_USER", default = sys.env("JDBC_TEST_USER")),
    sys.props.getOrElse("JDBC_TEST_PASSWORD", default = sys.env("JDBC_TEST_PASSWORD"))
  )
  val db = connection.open
  connection.populateTestDatabase

  addServlet(new GalleryServlet(db), "/api/galleries/*")

  describe("show gallery (GET @ /galleries/:id)") {
    def show(f: Tables.GalleriesRow => Unit) {
      get("/api/galleries/1") {
        var res = parse(body).extract[Tables.GalleriesRow]
        f(res)
      }
    }

    it("retrieves the correct gallery") {
      show((gal: Tables.GalleriesRow) => {
        gal.galleryId should equal (1)
      })
    }

    it("contains a name") {
      show((gal: Tables.GalleriesRow) => {
        gal.name shouldBe a [String]
      })
    }

    it("contains an order") {
      show((gal: Tables.GalleriesRow) => {
        gal.galleryOrder should be >= 0
      })
    }

    it("contains a description") {
      show((gal: Tables.GalleriesRow) => {
       gal.description shouldBe a [String] 
      })
    }
  }

  describe("index galleries (GET @ /)") {
    def index(f: List[Tables.GalleriesRow] => Unit) {
      get("/api/galleries/") {
        var res = parse(body).extract[List[Tables.GalleriesRow]]
        f(res)
      }
    }

    it("retrieves all galleries") {
      index((galleries: List[Tables.GalleriesRow]) => {
        galleries.length should be > 0
      })
    }
  }

  describe("create gallery (POST @ /galleries/)") {
  
    val testGallery = Map(
      "name" -> "Test Gallery",
      "description" -> "This is a test",
      "galleryOrder" -> 4
    )
    val jsonHeader = Map(
      "Content-Type" -> " application/json"
    )


    it("creates a gallery") {
      post("/api/galleries/", write(testGallery), jsonHeader) {
        val res = parse(body).extract[Tables.GalleriesRow] 
        res.name should equal (testGallery("name"))
        res.description should equal (testGallery("description"))
        res.galleryId should be > 0
      }
    }
  }

  describe("update gallery (PUT @ /galleries/:id)") {

    val testGallery = Map(
      "galleryId" -> 1,
      "name" -> "Test1 - Updated",
      "description" -> "Test Description1 - updated",
      "galleryOrder" -> 100
    )

    val jsonHeader = Map(
      "Content-Type" -> " application/json"
    )

    def update(f: Tables.GalleriesRow => Unit) {
      put("/api/galleries/1", write(testGallery), jsonHeader) {
        var res = parse(body).extract[Tables.GalleriesRow]
        f(res)
      }
    }

    it("updates the gallery properties") {
      update(res => {
        res.galleryId should equal (testGallery("galleryId"))
        res.name should equal (testGallery("name"))
        res.description should equal (testGallery("description"))
        res.galleryOrder should equal (testGallery("galleryOrder"))
      })
    }
  }

  describe("delete gallery (DELETE @ /galleries/:id") {

    val jsonHeader = Map(
      "Content-Type" -> " application/json"
    )

    def deleteGallery(f: Map[String, Int] => Unit) {
      delete("/api/galleries/1", jsonHeader) {
        var res = parse(body).extract[Map[String, Int]]
        f(res)
      }
    }

    def index(f: List[Tables.GalleriesRow] => Unit) {
      get("/api/galleries/") {
        var res = parse(body).extract[List[Tables.GalleriesRow]]
        f(res)
      }
    }

    it("returns a 200 status code") {
      deleteGallery(res => {
        res("status") should equal (200)
      })
    }

    it("deletes the gallery") {
      deleteGallery(res => {
        index(galleries => {
          galleries.exists(_.galleryId == 1) shouldBe false
        })
      })
    }
  }
}

