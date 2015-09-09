package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._
import org.scalatra.json.JsonSupport._
import com.revveries.app.models.Tables
import scala.slick.driver.PostgresDriver.api._
import org.json4s.jackson.Serialization.{read, write}
import com.revveries.app.utils.Auth

class RevveriesServlet(val db: Database) extends ScalatraServlet 
  with FutureSupport with JacksonJsonSupport with ScalateSupport with Auth {

  val staticUrl = sys.env("STATIC_URL")

  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(
      classOf[Tables.GalleriesRow] -> Tables,
      classOf[Tables.PicturesRow] -> Tables
    )
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  before() {
    contentType = "text/html"
  }

  get("/") {
    val galleryJoin = for {
      (gallery, picture) <- Tables.Galleries join Tables.Pictures on (_.galleryId === _.galleryId)
    } yield (gallery, picture)
    db.run(galleryJoin.result) map { galleries =>
      val (gals, pics) = galleries.unzip
      val picturesByGallery = pics.groupBy(_.galleryId)
      val galleriesJson = 
        gals.distinct.map(gal => Map(
          "gallery" -> gal, 
          "pictures" -> picturesByGallery(gal.galleryId)
        ))
      layoutTemplate("/WEB-INF/templates/views/app.ssp", 
        "staticUrl" -> staticUrl,
        "galleriesJson" -> write(galleriesJson)
      )
    }
  }

  get("/cms") {
    auth
    layoutTemplate("/WEB-INF/templates/views/cms.ssp",
      "staticUrl" -> staticUrl
    )
  }

  get("/auth") {
    layoutTemplate("/WEB-INF/templates/views/auth.ssp",
      "staticUrl" -> staticUrl
    )
  }
}
