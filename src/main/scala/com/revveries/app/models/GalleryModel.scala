package com.revveries.app.models

import slick.driver.JdbcDriver.api._

object GalleryModel {
  class Galleries(tag: Tag) extends Table[(Int, String, String)](tag, "GALLERY") {
    def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
    def name = column[String]("NAME")
    def description = column[String]("DESCRIPTION")

    def * = (id, name, description)
  }
  val galleries = TableQuery[Galleries]
}
