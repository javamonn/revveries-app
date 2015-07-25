package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.json.JsonSupport._
import com.revveries.app.models.Tables
import scala.slick.driver.PostgresDriver.api._

class GalleryServlet(val db: Database) extends ScalatraServlet with FutureSupport with JacksonJsonSupport with MethodOverride {
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
    db.run(Tables.Galleries.result) 
  }

  /**
   * Create gallery
   */
  post("/") {
    val gallery = 
      (parse(request.body) merge parse("""{"galleryId": -1}""")).extract[Tables.GalleriesRow]
    val galleryInsert =
      (Tables.Galleries 
        returning Tables.Galleries.map(_.galleryId)
        into ((gallery, id) => gallery.copy(galleryId=id))
      ) += gallery
    db.run(galleryInsert)
  }

  /**
   * Get gallery :id
   */
  get("/:id") {
    val galleryFind = Tables.Galleries.filter(_.galleryId === params("id").toInt)
    db.run(galleryFind.result)
  }

  /**
   * Update gallery :id
   */
  put("/:id") {
    val gallery = parse(request.body).extract[Tables.GalleriesRow]
    val galleryUpdate = Tables.Galleries
      .filter(_.galleryId === params("id").toInt)
      .map(gal => (gal.name, gal.description, gal.galleryOrder))
      .update((gallery.name, gallery.description, gallery.galleryOrder))
        
    db.run(galleryUpdate) map { status =>
      // TODO: Handle status = 0 non update case
      gallery
    }
  }

  /**
   * Delete gallery :id
   */
  delete("/:id") {
    val galleryDelete = Tables.Galleries.filter(_.galleryId === params("id").toInt)
    db.run(galleryDelete.delete) map { rowsDeleted =>
      Map(
        "status" -> 200
      )
    }
  }

  /**
   * Ordered list of pictures in gallery :id
   */
  get("/:id/pictures") {
    val picturesIndex = Tables.Pictures
      .filter(_.galleryId === params("id").toInt)
      .sortBy(_.pictureOrder.asc)
    db.run(picturesIndex.result)
  }
}
