package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.BeforeAndAfterAll
import org.scalatest.FunSpecLike
import com.revveries.app.utils.DatabaseConnection
import com.revveries.app.utils.TestDatabaseConnection
import slick.driver.PostgresDriver.api._
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.{read, write}
import com.revveries.app.models.Tables
import com.revveries.app.utils.RevveriesSuite

class PictureServletSpec extends ScalatraSpec with FunSpecLike {
  
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)

  addServlet(new PictureServlet(RevveriesSuite.db), "/api/pictures/*")

  val jsonHeader = Map(
    "Content-Type" -> " application/json"
  )

  def index(f: List[Tables.PicturesRow] => Unit) {
    get("/api/pictures/") {
      var res = parse(body).extract[List[Tables.PicturesRow]]
      f(res)
    }
  }

  def create(picture: Map[String, Any], f: Tables.PicturesRow => Unit) {
    post("/api/pictures/", write(picture), jsonHeader) {
      var res = parse(body).extract[Tables.PicturesRow]
      f(res)
    }
  }

  def update(pictureIndex: Int, picture: Map[String, Any], f: Tables.PicturesRow => Unit) {
    put(s"/api/pictures/$pictureIndex", write(picture), jsonHeader) {
      var res = parse(body).extract[Tables.PicturesRow]
      f(res)
    }
  }

  def show(pictureIndex: Int, f: Tables.PicturesRow => Unit) {
    get(s"/api/pictures/$pictureIndex") {
      var res = parse(body).extract[Tables.PicturesRow]
      f(res)
    }
  }

  def deletePicture(pictureIndex: Int, f: Map[String, Int] => Unit) {
    delete(s"/api/pictures/$pictureIndex", jsonHeader) {
      var res = parse(body).extract[Map[String, Int]]
      f(res)
    }
  }

  describe("index pictures (GET @ /pictures/)") {
    it("retrieves all pictures") {
      index(pictures => pictures.length should be > 0)
    }
  }

  describe("show picture (GET @ /pictures/:id)") {
    it("retrieves the correct picture") {
      show(1, (picture => picture.pictureId should equal (1)))
    }
  }

  describe("create picture (POST @ /pictures)") {
    val testPicture = Map(
      "pictureId" -> -1,
      "title" -> "Test Picture 1",
      "description" -> "Test Picture Description 1",
      "url" -> "http://testpicture.com",
      "galleryId" -> 2,
      "pictureOrder" -> 3
    )
    it("creates the picture"){
      create(testPicture, picture => {
        picture.title should equal(testPicture("title"))
        picture.description should equal(testPicture("description"))
        picture.url should equal(testPicture("url"))
        picture.galleryId should equal(testPicture("galleryId"))
        picture.pictureOrder should equal(testPicture("pictureOrder"))
      })
    }
  }

  describe("delete picture (DELETE @ /pictures/:id") {
    it("returns a 200 status code") {
      deletePicture(1, res => {
        res("status") should equal (200)
      })
    }

    it("deletes the picture") {
      deletePicture(1, res => {
        index(pictures => {
          pictures.exists(_.pictureId == 1) shouldBe false
        })
      })
    }
  }

  describe("update picture (PUT @ /pictures/:id)") {
    val testPicture = Map(
      "pictureId" -> -1,
      "title" -> "Test Picture 1 - updated",
      "description" -> "Test Picture Description 1 - updated",
      "url" -> "http://testpicture.com",
      "galleryId" -> 2,
      "pictureOrder" -> 3
    )

    it("updates the picture properties") {
      update(1, testPicture, res => {
        res.title should equal (testPicture("title"))
        res.description should equal (testPicture("description"))
      })
    }
  }

}
