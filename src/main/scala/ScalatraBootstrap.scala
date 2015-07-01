import com.revveries.app._
import org.scalatra._
import javax.servlet.ServletContext
import com.mchange.v2.c3p0.ComboPooledDataSource
import slick.driver.JdbcDriver.api._
import java.net.URI

class ScalatraBootstrap extends LifeCycle {

  val cpds = initCpds()

  override def init(context: ServletContext) {
    val db = Database.forDataSource(cpds)
    context.mount(new RevveriesServlet, "/")
    context.mount(new GalleryServlet(db), "/api/gallery/*")
  }

  override def destroy(context: ServletContext) {
    cpds.close
  }

  private def initCpds(): ComboPooledDataSource = {
    val cpds = new ComboPooledDataSource
    cpds.setJdbcUrl(sys.env("JDBC_URL")
    println("jdbc:postgresql://" + dbUri.getHost() + ":" + dbUri.getPort() + dbUri.getPath())
    cpds
  }
}
