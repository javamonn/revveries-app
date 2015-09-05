package com.revveries.app.utils

import org.flywaydb.core.Flyway
import com.mchange.v2.c3p0.ComboPooledDataSource
import slick.driver.JdbcDriver.api._

class DatabaseConnection(uri: String) {
  val flyway = new Flyway
  flyway.setDataSource(uri, sys.env("POSTGRES_USER"), sys.env("POSTGRES_PASSWORD"))
  flyway.migrate

  val cpds: ComboPooledDataSource = new ComboPooledDataSource
  cpds.setJdbcUrl(uri)
  val database = Database.forDataSource(cpds)

  def open: Database = {
    database
  }

  def close = {
    database.close
    cpds.close
  }
}
