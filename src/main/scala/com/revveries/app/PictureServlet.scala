package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.json.JsonSupport._
import com.revveries.app.models.Tables
import scala.slick.driver.PostgresDriver.api._

class PictureServlet(val db: Database) extends ScalatraServlet with FutureSupport with JacksonJsonSupport with MethodOverride {
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.PicturesRow] -> Tables)
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  before() {
    contentType = formats("json")
  }

  /**
   * Create picture
   */
  post("/") {
    val picture = 
      (parse(request.body) merge parse("""{"pictureId": -1}""")).extract[Tables.PicturesRow]
    val pictureInsert = (Tables.Pictures
      returning Tables.Pictures.map(_.pictureId)
      into ((picture, id) => picture.copy(pictureId=id))
    ) += picture
    db.run(pictureInsert)
  }

  /**
   * Index of all pictures
   */
  get("/") {
    db.run(Tables.Pictures.result) 
  }

  /**
   * Get picture :id
   */
  get("/:id") {
    val pictureFind = Tables.Pictures.filter(_.pictureId === params("id").toInt)
    db.run(pictureFind.result)
  }

  /**
   * Update picture :id
   */
  put("/:id") {
    val picture = parse(request.body).extract[Tables.PicturesRow]
    val pictureUpdate = Tables.Pictures
      .filter(_.pictureId === params("id").toInt)
      .map(pic => (pic.title, pic.description, pic.url, pic.galleryId, pic.pictureOrder))
      .update((picture.title, picture.description, picture.url, picture.galleryId, picture.pictureOrder))
        
    db.run(pictureUpdate) map { status =>
      // TODO: Handle status = 0 non update case
      picture
    }
  }

  /**
   * Delete picture :id
   */
  delete("/:id") {
    val pictureDelete = Tables.Pictures.filter(_.pictureId === params("id").toInt)
    db.run(pictureDelete.delete) map { rowsDeleted =>
      Map(
        "status" -> 200
      )
    }
  }
}
