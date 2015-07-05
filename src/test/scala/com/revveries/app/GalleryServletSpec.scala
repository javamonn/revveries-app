package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.FunSpecLike

class GalleryServletSpec extends ScalatraSuite with FunSpecLike { 
  addServlet(classOf[GalleryServlet], "/*")
}
