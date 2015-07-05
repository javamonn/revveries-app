package com.revveries.app

import org.scalatra._
import slick.driver.JdbcDriver.api._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._

class GalleryServlet(val db: Database) extends ScalatraServlet with JacksonJsonSupport {
  protected implicit lazy val jsonFormats: Formats = DefaultFormats

  before() {
    contentType = formats("json")
  }

  /**
   * Get slug info of all galleries
   */
  get("/") {

  }

  /**
   * Get gallery :id
   */
  get("/:id") {

  }
}
