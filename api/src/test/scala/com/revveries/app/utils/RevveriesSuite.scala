package com.revveries.app.utils
import slick.driver.PostgresDriver.api._

/**
 * TODO: Clean up and close db connection in an afterAll
 */
object RevveriesSuite {
  val connection = new TestDatabaseConnection(
    sys.props.getOrElse("JDBC_TEST_URI", default = sys.env("JDBC_TEST_URI")),
    sys.props.getOrElse("JDBC_TEST_BASE_URL", default = sys.env("JDBC_TEST_BASE_URL")),
    sys.props.getOrElse("JDBC_TEST_USER", default = sys.env("JDBC_TEST_USER")),
    sys.props.getOrElse("JDBC_TEST_PASSWORD", default = sys.env("JDBC_TEST_PASSWORD"))
  )
  val db = connection.open
  connection.populateTestDatabase
}
