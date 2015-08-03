package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import com.revveries.app.utils.Auth

class RevveriesServlet extends ScalatraServlet 
  with ScalateSupport with Auth {

  before() {
    contentType = "text/html"
  }

  get("/") {
    ssp("index")
  }

  get("/cms") {
    auth
    ssp("cms")
  }

  get("/auth") {
    ssp("auth")
  }
}
