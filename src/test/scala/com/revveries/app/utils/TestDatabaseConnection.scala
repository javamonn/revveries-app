package com.revveries.app.utils

import org.flywaydb.core.Flyway
import slick.driver.JdbcDriver.api._
import com.revveries.app.models.Tables
import scala.util.Success

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
    val galleryInsert = (Tables.Galleries 
        returning Tables.Galleries.map(_.galleryId)
        into ((gallery, id) => gallery.copy(galleryId = id))
      ) ++= Seq(
        Tables.GalleriesRow(-1, "Test Gallery1", "Test Description1", 0),
        Tables.GalleriesRow(-1, "Test Gallery2", "Test Description2", 2),
        Tables.GalleriesRow(-1, "Test Gallery3", "Test Description3", 3)
      )
    database.run(galleryInsert) map { 
      _.map(gal => {
        val pictureInsert = Tables.Pictures ++= Seq( 
          Tables.PicturesRow(-1, "Test Picture1", "Test Description1", "http://test1.com", gal.galleryId, 0),
          Tables.PicturesRow(-1, "Test Picture2", "Test Description2", "http://test2.com", gal.galleryId, 1),
          Tables.PicturesRow(-1, "Test Picture3", "Test Description3", "http://test3.com", gal.galleryId, 2)
        )
        database.run(pictureInsert)
      })
    }
  }
}
