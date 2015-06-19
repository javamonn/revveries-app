package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport

class RevveriesServlet extends RevveriesappStack {

  get("/") {
    contentType = "text/html"
    ssp("index")
  }

}
