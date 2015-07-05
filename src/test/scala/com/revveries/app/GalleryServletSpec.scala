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

  addServlet(new GalleryServlet(db), "/api/galleries/*")

  describe("index (GET @ /)") {
    it("retrieves gallery slugs") {

    }
  }

  describe("show (GET @ /galleries/:id)") {
    it("retrieves a specific gallery") {

    }
  }

  describe("create (POST @ /galleries/)") {
  
    val testGallery = Map(
      "name" -> "Test Gallery",
      "description" -> "This is a test"
    )
    val jsonHeader = Map(
      "Content-Type" -> " application/json"
    )


    it("creates a gallery") {
      post("/api/galleries/", write(testGallery), jsonHeader) {
        val res = parse(body).extract[Tables.GalleriesRow] 
        res.name should equal (testGallery("name"))
        res.description should equal (testGallery("description"))
      }
    }
  }
}

