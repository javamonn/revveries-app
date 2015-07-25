package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.BeforeAndAfterAll
import org.scalatest.FunSpecLike
import com.revveries.app.utils.DatabaseConnection
import com.revveries.app.utils.TestDatabaseConnection
import slick.driver.PostgresDriver.api._
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.{read, write}
import com.revveries.app.models.Tables
import com.revveries.app.utils.RevveriesSuite

class PictureServletSpec extends ScalatraSpec with FunSpecLike {
  
  protected implicit lazy val jsonFormats: Formats = 
    DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)

  addServlet(new PictureServlet(RevveriesSuite.db), "/api/pictures/*")

  describe("show picture (GET @ /pictures/:id)") {
    def show(f: Tables.PicturesRow => Unit) {
      get("/api/pictures/1") {
        var res = parse(body).extract[Tables.PicturesRow]
        f(res)
      }
    }
    it("retrieves the correct picture") {
      show((pic => {
        pic.pictureId should equal (1)
      }))
    }
  }
}
