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
   * Create picture
   */
  post("/") {
    
  }

  /**
   * Index of all pictures
   */
  get("/") {
    db.run(Tables.Pictures.result) 
  }

  /**
   * Update picture :id
   */
  put("/:id") {

  }

  /**
   * Delete picture :id
   */
  delete("/:id") {

  }
}
