package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.FunSpecLike
import com.revveries.app.utils.RevveriesSuite
import slick.driver.PostgresDriver.api._
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.{read, write}
import com.revveries.app.models.Tables

class RevveriesServletSpec extends ScalatraSuite with FunSpecLike { 

  addServlet(new RevveriesServlet(RevveriesSuite.db), "/*")

  /* TODO: 
   *   - Setup selenium for more comprehensive integration tests
   *   - abstract get into a before/after
   */

  describe("routes") {
    describe("fetch index") {
      it("completes successfully") { 
        get("/") {
          println(body)
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
