package com.revveries.app

import org.scalatra.test.scalatest._
import org.scalatest.BeforeAndAfterAll
import org.scalatest.FunSpecLike
import com.revveries.app.utils.DatabaseConnection
import com.revveries.app.utils.TestDatabaseConnection
import slick.driver.JdbcDriver.api._

class GalleryServletSpec extends ScalatraSpec with FunSpecLike {

  override def afterAll = {
    connection.close
    super.afterAll()
  }
  
  val connection = new TestDatabaseConnection(
    sys.props.getOrElse("JDBC_TEST_URL", default = sys.env("JDBC_TEST_URL")),
    sys.props.getOrElse("JDBC_TEST_USER", default = sys.env("JDBC_TEST_USER")),
    sys.props.getOrElse("JDBC_TEST_PASSWORD", default = sys.env("JDBC_TEST_PASSWORD"))
  )
  val db = connection.open

  addServlet(new GalleryServlet(db), "/api/galleries/*")

  describe("test") {
    it("cleans the db") {

    }
  }
  
}

