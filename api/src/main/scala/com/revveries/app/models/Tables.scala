package com.revveries.app.models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.driver.PostgresDriver
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.driver.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema = Galleries.schema ++ Pictures.schema ++ SchemaVersion.schema
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Galleries
   *  @param galleryId Database column gallery_id SqlType(serial), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(255,true)
   *  @param slug Database column name SqlType(varchar), Length(255,true)
   *  @param description Database column description SqlType(text) 
   *  @param galleryOrder Database column gallery_order SqlType(integer)
   */
  case class GalleriesRow(galleryId: Int, name: String, slug: String, description: String, galleryOrder: Int)
  /** GetResult implicit for fetching GalleriesRow objects using plain SQL queries */
  implicit def GetResultGalleriesRow(implicit e0: GR[Int], e1: GR[String]): GR[GalleriesRow] = GR{
    prs => import prs._
    GalleriesRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[Int]))
  }
  /** Table description of table galleries. Objects of this class serve as prototypes for rows in queries. */
  class Galleries(_tableTag: Tag) extends Table[GalleriesRow](_tableTag, "galleries") {
    def * = (galleryId, name, slug, description, galleryOrder) <> (GalleriesRow.tupled, GalleriesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(galleryId), Rep.Some(name), Rep.Some(slug), Rep.Some(description), Rep.Some(galleryOrder)).shaped.<>({r=>import r._; _1.map(_=> GalleriesRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column gallery_id SqlType(serial), AutoInc, PrimaryKey */
    val galleryId: Rep[Int] = column[Int]("gallery_id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(255,true) */
    val name: Rep[String] = column[String]("name", O.Length(255,varying=true))
    /** Database column slug SqlType(varchar), Length(255,true) */
    val slug: Rep[String] = column[String]("slug", O.Length(255,varying=true))
    /** Database column description SqlType(text) */
    val description: Rep[String] = column[String]("description")
    /** Database column gallery_order SqlType(integer) */
    val galleryOrder: Rep[Int] = column[Int]("gallery_order")
  }
  /** Collection-like TableQuery object for table Galleries */
  lazy val Galleries = new TableQuery(tag => new Galleries(tag))

  /** Entity class storing rows of table Pictures
   *  @param pictureId Database column picture_id SqlType(serial), AutoInc, PrimaryKey
   *  @param title Database column title SqlType(varchar), Length(255,true)
   *  @param description Database column description SqlType(text)
   *  @param url Database column url SqlType(varchar), Length(255,true)
   *  @param galleryId Database column gallery_id SqlType(int4)
   *  @param pictureOrder Database column picture_order SqlType(integer) */
  case class PicturesRow(pictureId: Int, title: String, description: String, url: String, galleryId: Int, pictureOrder: Int, width: Int, height: Int)
  /** GetResult implicit for fetching PicturesRow objects using plain SQL queries */
  implicit def GetResultPicturesRow(implicit e0: GR[Int], e1: GR[String]): GR[PicturesRow] = GR{
    prs => import prs._
    PicturesRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[Int], <<[Int], <<[Int], <<[Int]))
  }
  /** Table description of table pictures. Objects of this class serve as prototypes for rows in queries. */
  class Pictures(_tableTag: Tag) extends Table[PicturesRow](_tableTag, "pictures") {
    def * = (pictureId, title, description, url, galleryId, pictureOrder, width, height) <> (PicturesRow.tupled, PicturesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(pictureId), Rep.Some(title), Rep.Some(description), Rep.Some(url), Rep.Some(galleryId), Rep.Some(pictureOrder), Rep.Some(width), Rep.Some(height)).shaped.<>({r=>import r._; _1.map(_=> PicturesRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7.get, _8.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column picture_id SqlType(serial), AutoInc, PrimaryKey */
    val pictureId: Rep[Int] = column[Int]("picture_id", O.AutoInc, O.PrimaryKey)
    /** Database column title SqlType(varchar), Length(255,true) */
    val title: Rep[String] = column[String]("title", O.Length(255,varying=true))
    /** Database column description SqlType(text) */
    val description: Rep[String] = column[String]("description")
    /** Database column url SqlType(varchar), Length(255,true) */
    val url: Rep[String] = column[String]("url", O.Length(255,varying=true))
    /** Database column gallery_id SqlType(int4) */
    val galleryId: Rep[Int] = column[Int]("gallery_id")
    /** Database column picture_order SqlType(integer) */
    val pictureOrder: Rep[Int] = column[Int]("picture_order")
    /** Database column width SqlType(integer) */
    val width: Rep[Int] = column[Int]("width")
    /** Database column height SqlType(integer) */
    val height: Rep[Int] = column[Int]("height")

    /** Foreign key referencing Galleries (database name pictures_gallery_id_fkey) */
    lazy val galleriesFk = foreignKey("pictures_gallery_id_fkey", galleryId, Galleries)(r => r.galleryId, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Pictures */
  lazy val Pictures = new TableQuery(tag => new Pictures(tag))

  /** Entity class storing rows of table SchemaVersion
   *  @param versionRank Database column version_rank SqlType(int4)
   *  @param installedRank Database column installed_rank SqlType(int4)
   *  @param version Database column version SqlType(varchar), PrimaryKey, Length(50,true)
   *  @param description Database column description SqlType(varchar), Length(200,true)
   *  @param `type` Database column type SqlType(varchar), Length(20,true)
   *  @param script Database column script SqlType(varchar), Length(1000,true)
   *  @param checksum Database column checksum SqlType(int4), Default(None)
   *  @param installedBy Database column installed_by SqlType(varchar), Length(100,true)
   *  @param installedOn Database column installed_on SqlType(timestamp)
   *  @param executionTime Database column execution_time SqlType(int4)
   *  @param success Database column success SqlType(bool) */
  case class SchemaVersionRow(versionRank: Int, installedRank: Int, version: String, description: String, `type`: String, script: String, checksum: Option[Int] = None, installedBy: String, installedOn: java.sql.Timestamp, executionTime: Int, success: Boolean)
  /** GetResult implicit for fetching SchemaVersionRow objects using plain SQL queries */
  implicit def GetResultSchemaVersionRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]], e3: GR[java.sql.Timestamp], e4: GR[Boolean]): GR[SchemaVersionRow] = GR{
    prs => import prs._
    SchemaVersionRow.tupled((<<[Int], <<[Int], <<[String], <<[String], <<[String], <<[String], <<?[Int], <<[String], <<[java.sql.Timestamp], <<[Int], <<[Boolean]))
  }
  /** Table description of table schema_version. Objects of this class serve as prototypes for rows in queries.
   *  NOTE: The following names collided with Scala keywords and were escaped: type */
  class SchemaVersion(_tableTag: Tag) extends Table[SchemaVersionRow](_tableTag, "schema_version") {
    def * = (versionRank, installedRank, version, description, `type`, script, checksum, installedBy, installedOn, executionTime, success) <> (SchemaVersionRow.tupled, SchemaVersionRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = (Rep.Some(versionRank), Rep.Some(installedRank), Rep.Some(version), Rep.Some(description), Rep.Some(`type`), Rep.Some(script), checksum, Rep.Some(installedBy), Rep.Some(installedOn), Rep.Some(executionTime), Rep.Some(success)).shaped.<>({r=>import r._; _1.map(_=> SchemaVersionRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7, _8.get, _9.get, _10.get, _11.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column version_rank SqlType(int4) */
    val versionRank: Rep[Int] = column[Int]("version_rank")
    /** Database column installed_rank SqlType(int4) */
    val installedRank: Rep[Int] = column[Int]("installed_rank")
    /** Database column version SqlType(varchar), PrimaryKey, Length(50,true) */
    val version: Rep[String] = column[String]("version", O.PrimaryKey, O.Length(50,varying=true))
    /** Database column description SqlType(varchar), Length(200,true) */
    val description: Rep[String] = column[String]("description", O.Length(200,varying=true))
    /** Database column type SqlType(varchar), Length(20,true)
     *  NOTE: The name was escaped because it collided with a Scala keyword. */
    val `type`: Rep[String] = column[String]("type", O.Length(20,varying=true))
    /** Database column script SqlType(varchar), Length(1000,true) */
    val script: Rep[String] = column[String]("script", O.Length(1000,varying=true))
    /** Database column checksum SqlType(int4), Default(None) */
    val checksum: Rep[Option[Int]] = column[Option[Int]]("checksum", O.Default(None))
    /** Database column installed_by SqlType(varchar), Length(100,true) */
    val installedBy: Rep[String] = column[String]("installed_by", O.Length(100,varying=true))
    /** Database column installed_on SqlType(timestamp) */
    val installedOn: Rep[java.sql.Timestamp] = column[java.sql.Timestamp]("installed_on")
    /** Database column execution_time SqlType(int4) */
    val executionTime: Rep[Int] = column[Int]("execution_time")
    /** Database column success SqlType(bool) */
    val success: Rep[Boolean] = column[Boolean]("success")

    /** Index over (installedRank) (database name schema_version_ir_idx) */
    val index1 = index("schema_version_ir_idx", installedRank)
    /** Index over (success) (database name schema_version_s_idx) */
    val index2 = index("schema_version_s_idx", success)
    /** Index over (versionRank) (database name schema_version_vr_idx) */
    val index3 = index("schema_version_vr_idx", versionRank)
  }
  /** Collection-like TableQuery object for table SchemaVersion */
  lazy val SchemaVersion = new TableQuery(tag => new SchemaVersion(tag))
}
