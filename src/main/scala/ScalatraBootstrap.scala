import com.revveries.app._
import org.scalatra._
import javax.servlet.ServletContext
import com.mongodb.casbah.Imports._

class ScalatraBootstrap extends LifeCycle {
  override def init(context: ServletContext) {
    val uri = MongoClientURI(sys.env("MONGO_URI"))
    val mongoClient = MongoClient(uri)
    val mongoDB = mongoClient(sys.env("MONGO_DB")) 
    context.mount(new RevveriesServlet(mongoDB), "/*")
  }
}
