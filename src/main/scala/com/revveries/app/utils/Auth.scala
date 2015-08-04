package com.revveries.app.utils

import org.scalatra._
import javax.servlet.http.HttpServletRequest

trait Auth extends ScalatraBase {
  val secret = sys.props.getOrElse("AUTH_SECRET", default = sys.env("AUTH_SECRET"))

  def auth = {
    if (!request.cookies.contains("authSecret") || request.cookies("authSecret") != secret) {
      redirect("/auth")
    }
  }
}
