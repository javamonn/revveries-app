package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.BeforeAndAfterAll
import org.scalatest.FunSpecLike
import com.revveries.app.utils.DatabaseConnection
import com.revveries.app.utils.TestDatabaseConnection
import slick.driver.JdbcDriver.api._
import org.json4s._
import org.json4s.jackson.JsonMethods._

class GalleryServletSpec extends ScalatraSpec with FunSpecLike {
  
  implicit lazy val jsonFormats: Formats = DefaultFormats

  override def afterAll = {
    connection.close
    super.afterAll()
  }
  
  val connection = new TestDatabaseConnection(
    sys.props.getOrElse("JDBC_TEST_URL", default = sys.env("JDBC_TEST_URL")),
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

    case class GalleryCreateResponse(name: String, description: String, id: String)

    it("creates a gallery") {
      post("/", testGallery, jsonHeader) {
        val res = parse(body).extract[GalleryCreateResponse] 
        res.name should equal (testGallery("name"))
        res.description should equal (testGallery("description"))
      }
    }
  }
}

