package com.revveries.app.utils

import com.mchange.v2.c3p0.ComboPooledDataSource
import slick.driver.JdbcDriver.api._

class DatabaseConnection(uri: String) {
  val cpds: ComboPooledDataSource = new ComboPooledDataSource
  cpds.setJdbcUrl(uri)
  val database = Database.forDataSource(cpds)

  def open: Database = database
  def close = {
    database.close
    cpds.close
  }
}
