package com.revveries.app.controllers

import org.scalatra._
import com.revveries.app.models.Tables
import com.revveries.app.models.Tables._
import scala.slick.driver.PostgresDriver.api._
import scala.concurrent._

class PictureController(db: Database) {

  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  def create(picture: PicturesRow): Future[PicturesRow] = {
    val pictureInsert = (Tables.Pictures
      returning Tables.Pictures.map(_.pictureId)
      into ((picture, id) => picture.copy(pictureId=id))
    ) += picture
    return db.run(pictureInsert)
  }

  def index: Future[Seq[PicturesRow]] = {
    return db.run(Tables.Pictures.result) 
  }

  def get(pictureId: Int): Future[Seq[PicturesRow]] = {
    val pictureFind = Tables.Pictures.filter(_.pictureId === pictureId)
    return db.run(pictureFind.result)
  }

  def update(pictureId: Int, picture: PicturesRow): Future[Int] = {
    val pictureUpdate = Tables.Pictures
      .filter(_.pictureId === pictureId)
      .map(pic => (pic.title, pic.description, pic.url, pic.galleryId, pic.pictureOrder))
      .update((picture.title, picture.description, picture.url, picture.galleryId, picture.pictureOrder))
        
    return db.run(pictureUpdate)
  }

  def delete(pictureId: Int): Future[Int] = {
    val pictureDelete = Tables.Pictures.filter(_.pictureId === pictureId)
    return db.run(pictureDelete.delete)
  }

}
