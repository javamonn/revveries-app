package com.revveries.app.utils

import org.flywaydb.core.Flyway
import slick.driver.JdbcDriver.api._
import com.revveries.app.models.Tables
import scala.concurrent.ExecutionContext.Implicits.global

class TestDatabaseConnection(uri: String, base_url: String, user: String, password: String) extends DatabaseConnection(uri) {
  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  val flyway = new Flyway
  flyway.setDataSource(base_url, user, password)
  flyway.clean
  flyway.migrate

  override def close {
    flyway.clean
    super.close
  }

  def populateTestDatabase {
    val testPopulate = DBIO.seq(
      Tables.Galleries ++= Seq(
        Tables.GalleriesRow(0, "Test1", "Test Description1", 0),
        Tables.GalleriesRow(1, "Test2", "Test Description2", 2),
        Tables.GalleriesRow(2, "Test3", "Test Description3", 1)
      )
    )
    database.run(testPopulate)
  }
}
