import slick.driver.JdbcDriver.api._

class Galleries(tag: Tag) extends Table[(Int, String, String)](tag, "GALLERY") {
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def name = column[String]("NAME")
  def description = column[String]("DESCRIPTION")
}
lazy val galleries = TableQuery[Galleries]
