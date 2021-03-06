package com.revveries.app.controllers

import org.scalatra._
import com.revveries.app.models.Tables
import com.revveries.app.models.Tables._
import scala.slick.driver.PostgresDriver.api._
import scala.concurrent._

class GalleryController(db: Database) {

  protected implicit def executor = scala.concurrent.ExecutionContext.Implicits.global

  def index: Future[Seq[GalleriesRow]] = {
    val galleryIndex = Galleries.result
    return db.run(Galleries.result) 
  }

  def get(galleryId: Int): Future[Seq[GalleriesRow]] = {
    val galleryFind = Galleries.filter(_.galleryId === galleryId)
    return db.run(galleryFind.result)
  }

  def create(gallery: GalleriesRow): Future[GalleriesRow] = {
    val galleryInsert =
      (Galleries 
        returning Galleries.map(_.galleryId)
        into ((gallery, id) => gallery.copy(galleryId=id))
      ) += gallery
    return db.run(galleryInsert)
  }

  def update(galleryId: Int, gallery: GalleriesRow): Future[Int] = {
    val galleryUpdate = Galleries
      .filter(_.galleryId === galleryId)
      .map(gal => (gal.name, gal.description, gal.galleryOrder))
      .update((gallery.name, gallery.description, gallery.galleryOrder))
        
    return db.run(galleryUpdate)
  }

  def delete(galleryId: Int): Future[Int] = {
    val galleryDelete = Galleries.filter(_.galleryId === galleryId)
    return db.run(galleryDelete.delete)
  }

  def picturesForGallery(galleryId: Int): Future[Seq[PicturesRow]] = {
    val picturesIndex = Pictures
      .filter(_.galleryId === galleryId)
      .sortBy(_.pictureOrder.asc)
    return db.run(picturesIndex.result)
  }
}
