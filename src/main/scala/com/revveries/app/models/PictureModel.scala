import slick.driver.JdbcDriver.api._
import com.revveries.app.models.GalleryModel

class Pictures(tag: Tag) extends Table[(Int, String, String, String)](tag, "Gallery") {
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def title = column[String]("NAME")
  def description = column[String]("DESCRIPTION")
  def url = column[String]("DESCRIPTION")
  def galID = column[Int]("GAL_ID")

  def * = (id, title, description, url, galID)

  def gallery = foreignKey("GAL_FK", galID, galleries)(_.id)
}
lazy val pictures = TableQuery[Pictures]
