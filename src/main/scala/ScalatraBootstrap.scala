import com.revveries.app._
import org.scalatra._
import javax.servlet.ServletContext
import java.net.URI
import com.revveries.app.utils.DatabaseConnection

class ScalatraBootstrap extends LifeCycle {

  val connection = new DatabaseConnection(sys.props.getOrElse("JDBC_URL", default = sys.env("JDBC_URL")))
 
  override def init(context: ServletContext) {
    val db = connection.open
    context.mount(new RevveriesServlet(db), "/")
    context.mount(new GalleryServlet(db), "/api/galleries/*")
    context.mount(new PictureServlet(db), "/api/pictures/*")
    context.mount(new AuthServlet, "/api/auth/*")
  }

  override def destroy(context: ServletContext) {
    connection.close
  }

}
