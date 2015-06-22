package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoDB

class RevveriesServlet(db: MongoDB) extends ScalatraServlet with ScalateSupport {

  get("/") {
    contentType = "text/html"
    ssp("index")
  }

}
