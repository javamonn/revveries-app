package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport

class RevveriesServlet extends ScalatraServlet with ScalateSupport {

  before() {
    contentType = "text/html"
  }

  get("/") {
    ssp("index")
  }

  get("/cms") {
    ssp("cms")
  }
}
