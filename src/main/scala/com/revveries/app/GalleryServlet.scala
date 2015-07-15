package com.revveries.app

import org.scalatra._
import slick.driver.JdbcDriver.api._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.json.JsonSupport._
import com.revveries.app.models.Tables
import com.revveries.app.models.Tables.Galleries
import scala.concurrent.ExecutionContext.Implicits.global

class GalleryServlet(val db: Database) extends ScalatraServlet with FutureSupport with JacksonJsonSupport {
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  before() {
    contentType = formats("json")
  }

  /**
   * Get slug info of all galleries
   */
  get("/") {
    db.run(Galleries.result) 
  }

  /**
   * Create gallery
   */
  post("/") {
    val gallery = 
      (parse(request.body) merge parse("""{"galleryId": -1}""")).extract[Tables.GalleriesRow]
    val galleryInsert =
      (Galleries 
        returning Galleries.map(_.galleryId)
        into ((gallery, id) => gallery.copy(galleryId=id))
      ) += gallery
    db.run(galleryInsert)
  }

  /**
   * Get gallery :id
   */
  get("/:id") {
    val galleryFind = Galleries.filter(_.galleryId === params("id").toInt)
    db.run(galleryFind.result)
  }

  /**
   * Update gallery :id
   */
  put("/:id") {
    val gallery = parse(request.body).extract[Tables.GalleriesRow]
    val galleryUpdate = Galleries
      .filter(_.galleryId === params("id").toInt)
      .map(gal => (gal.name, gal.description, gal.galleryOrder))
      .update((gallery.name, gallery.description, gallery.galleryOrder))
    db.run(galleryUpdate)
  }
}
