package com.revveries.app.utils

import org.flywaydb.core.Flyway

class TestDatabaseConnection(uri: String, base_url: String, user: String, password: String) extends DatabaseConnection(uri) {
  val flyway = new Flyway
  flyway.setDataSource(base_url, user, password)
  flyway.clean
  flyway.migrate

  override def close {
    flyway.clean
    super.close
  }

}
