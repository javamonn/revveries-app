package com.revveries.app.utils

import com.mchange.v2.c3p0.ComboPooledDataSource
import slick.driver.JdbcDriver.api._

class DatabaseConnection(uri: String) {
  val cpds: ComboPooledDataSource = new ComboPooledDataSource
  cpds.setJdbcUrl(uri)

  def open: Database = Database.forDataSource(cpds)
  def close = cpds.close
}
