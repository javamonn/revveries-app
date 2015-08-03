package com.revveries.app

import org.scalatra._
import scalate.ScalateSupport
import org.json4s.{DefaultFormats, Formats}

class AuthServlet extends ScalatraServler with FutureSupport with JacksonJsonSupport {
  protected implicit lazy val jsonFormats: Formats = DefaultFormats

  before() {
    contentType = formats("json")
  }

  /**
   * Attempt to authenticate with a secret.
   */
  post("/") {
    println(request.body)
  }

}
