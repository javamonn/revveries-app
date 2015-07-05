package com.revveries.app.utils

import org.flywaydb.core.Flyway

class TestDatabaseConnection(uri: String, user: String, password: String) extends DatabaseConnection(uri) {
  val flyway = new Flyway
  flyway.setDataSource(uri, user, password)
  flyway.migrate

  override def close {
    flyway.clean()
    super.close
  }

}
