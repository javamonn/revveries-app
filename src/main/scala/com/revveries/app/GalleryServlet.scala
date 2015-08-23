package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.json.JsonSupport._
import com.revveries.app.utils.Auth
import scala.slick.driver.PostgresDriver.api._
import com.revveries.app.models.Tables
import com.revveries.app.controllers.GalleryController

class GalleryServlet(db: Database) extends ScalatraServlet 
  with FutureSupport with JacksonJsonSupport with MethodOverride with Auth {

  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  val galleries = new GalleryController(db)

  before() {
    contentType = formats("json")
  }

  /**
   * Get slug info of all galleries
   */
  get("/") {
    galleries.index
  }

  /**
   * Create gallery
   */
  post("/") {
    auth
    val gallery = 
      (parse(request.body) merge parse("""{"galleryId": -1}""")).extract[Tables.GalleriesRow]
    galleries.create(gallery)
  }

  /**
   * Get gallery :id
   */
  get("/:id") {
    galleries.get(params("id").toInt)
  }

  /**
   * Update gallery :id
   */
  put("/:id") {
    auth
    val gallery = parse(request.body).extract[Tables.GalleriesRow]
    galleries.update(params("id").toInt, gallery) map { status =>
      // TODO: Handle status = 0 non update case
      gallery
    }
  }

  /**
   * Delete gallery :id
   */
  delete("/:id") {
    auth
    galleries.delete(params("id").toInt) map { rowsDeleted =>
      Map(
        "status" -> 200
      )
    }
  }

  /**
   * Ordered list of pictures in gallery :id
   */
  get("/:id/pictures") {
    galleries.picturesForGallery(params("id").toInt)
  }
}
