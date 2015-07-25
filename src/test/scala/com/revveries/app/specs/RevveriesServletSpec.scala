package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.FunSpecLike

class RevveriesServletSpec extends ScalatraSuite with FunSpecLike { 
  addServlet(classOf[RevveriesServlet], "/*")

  /* TODO: 
   *   - Setup selenium for more comprehensive integration tests
   *   - abstract get into a before/after
   */

  describe("routes") {
    describe("fetch index") {
      it("completes successfully") { 
        get("/") {
          status should equal (200)
        }
      }
      it("contains react elements") {
        get("/") {
          body should include ("id=\"app\"")
        }
      }
    }
  }

}
