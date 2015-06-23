package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport

class RevveriesServlet extends ScalatraServlet with ScalateSupport {
  get("/") {
    contentType = "text/html"
    ssp("index")
  }
}
