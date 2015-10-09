package com.revveries.app.utils

import org.flywaydb.core.Flyway
import com.mchange.v2.c3p0.ComboPooledDataSource
import slick.driver.JdbcDriver.api._
import scala.util.control.Breaks._
import org.slf4j.{Logger, LoggerFactory}

class DatabaseConnection(uri: String) {

  val flyway = new Flyway
  val logger = LoggerFactory.getLogger(getClass)

  breakable {
    while (true) {
      try {
        flyway.setDataSource(uri, sys.env("POSTGRES_USER"), sys.env("POSTGRES_PASSWORD"))
        flyway.setCleanOnValidationError(true)
        flyway.migrate
        break
      } catch {
        case e: Exception => {
          logger.info("unable to connect to db, retrying in 100ms")        
          logger.info(e.getMessage)
          Thread.sleep(100)
        }
      }
    }
  }

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
