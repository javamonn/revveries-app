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
import com.revveries.app.utils.RevveriesSuite

/**
 * TODO: clean and repopulate DB after each spec
 */

class GalleryServletSpec extends ScalatraSpec with FunSpecLike {
  
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)

  addServlet(new GalleryServlet(RevveriesSuite.db), "/api/galleries/*")

  val jsonHeader = Map(
    "Content-Type" -> " application/json"
  )

  def index(f: List[Tables.GalleriesRow] => Unit) {
    get("/api/galleries/") {
      var res = parse(body).extract[List[Tables.GalleriesRow]]
      f(res)
    }
  }

  def show(f: Tables.GalleriesRow => Unit) {
    get("/api/galleries/1") {
      var res = parse(body).extract[Tables.GalleriesRow]
      f(res)
    }
  }

  def update(gallery: Map[String, Any], f: Tables.GalleriesRow => Unit) {
    put("/api/galleries/1", write(gallery), jsonHeader) {
      var res = parse(body).extract[Tables.GalleriesRow]
      f(res)
    }
  }

  def deleteGallery(f: Map[String, Int] => Unit) {
    delete("/api/galleries/1", jsonHeader) {
      var res = parse(body).extract[Map[String, Int]]
      f(res)
    }
  }

  def getPictures(index: Int, f: List[Tables.PicturesRow] => Unit) {
    get(s"/api/galleries/$index/pictures") {
      var res = parse(body).extract[List[Tables.PicturesRow]]
      f(res)
    }
  }

  describe("show gallery (GET @ /galleries/:id)") {
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

  describe("index galleries (GET @ /galleries/)") {
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

    it("updates the gallery properties") {
      update(testGallery, res => {
        res.galleryId should equal (testGallery("galleryId"))
        res.name should equal (testGallery("name"))
        res.description should equal (testGallery("description"))
        res.galleryOrder should equal (testGallery("galleryOrder"))
      })
    }
  }

  describe("delete gallery (DELETE @ /galleries/:id") {

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

    it("deletes the gallery's pictures") {
      getPictures(1, pictures => {
        pictures.length shouldBe 0
      })
    }
  }

  describe("get pictures for gallery (GET @ /galleries/:id/pictures)") {

    val testGalleryId = 2
    it("returns the pictures in the gallery") {
      getPictures(testGalleryId, pictures => {
        pictures.length should be > 0
        pictures.forall(_.galleryId == testGalleryId) shouldBe true
      })
    }
    
    it("returns the pictures in order") {
      getPictures(testGalleryId, pictures => {
        var lastOrder = 0
        pictures.foreach(picture => {
          picture.pictureOrder.toInt should be >= lastOrder
          lastOrder = picture.pictureOrder.toInt
        })
      })
    }
  }
}

