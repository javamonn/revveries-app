package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.json.JsonSupport._
import com.revveries.app.models.Tables
import com.revveries.app.models.Tables.PicturesRow
import scala.slick.driver.PostgresDriver.api._
import com.revveries.app.utils.Auth
import com.revveries.app.controllers.PictureController

class PictureServlet(val db: Database) extends ScalatraServlet 
  with FutureSupport with JacksonJsonSupport with MethodOverride with Auth {
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.PicturesRow] -> Tables)
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  val pictures = new PictureController(db)

  before() {
    contentType = formats("json")
  }

  /**
   * Create picture
   */
  post("/") {
    auth
    val picture = 
      (parse(request.body) merge parse("""{"pictureId": -1}""")).extract[PicturesRow]
    pictures.create(picture)
  }

  /**
   * Index of all pictures
   */
  get("/") {
    pictures.index
  }

  /**
   * Get picture :id
   */
  get("/:id") {
    pictures.get(params("id").toInt)
  }

  /**
   * Update picture :id
   */
  put("/:id") {
    auth
    val picture = parse(request.body).extract[PicturesRow]
    pictures.update(params("id").toInt, picture) map { status =>
      // TODO: Handle status = 0 non update case
      picture
    }
  }

  /**
   * Delete picture :id
   */
  delete("/:id") {
    auth
    pictures.delete(params("id").toInt) map { rowsDeleted =>
      Map(
        "status" -> 200
      )
    }
  }
}
