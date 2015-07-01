package com.revveries.app.models

import slick.driver.JdbcDriver.api._

object PictureModel { 
  class Pictures(tag: Tag) extends Table[(Int, String, String, String)](tag, "Gallery") {
    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
    def title = column[String]("NAME")
    def description = column[String]("DESCRIPTION")
    def url = column[String]("DESCRIPTION")

    def * = (id, title, description, url)

    def galID = column[Int]("GAL_ID")
    def gallery = foreignKey("GAL_FK", galID, GalleryModel.galleries)(_.id)
  }

  val pictures = TableQuery[Pictures]
}
