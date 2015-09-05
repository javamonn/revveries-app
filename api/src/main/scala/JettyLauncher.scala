import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.{ DefaultServlet, ServletContextHandler }
import org.slf4j.{Logger, LoggerFactory}
import org.eclipse.jetty.webapp.WebAppContext
import org.scalatra.servlet.ScalatraListener

object JettyLauncher {
  def main(args: Array[String]) {

    val logger = LoggerFactory.getLogger(getClass)
    val port = if(System.getenv("API_PORT") != null) System.getenv("API_PORT").toInt else 3000
    val server = new Server(port)
    val context = new WebAppContext()

    context.setContextPath("/")
    context.setResourceBase("src/main/webapp")

    context.setEventListeners(Array(new ScalatraListener))

    server.setHandler(context)

    server.start
    server.join

    logger.info(s"api server listening on port $port")
  }
}
