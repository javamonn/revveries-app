import sbt._
import Keys._
import org.scalatra.sbt._
import org.scalatra.sbt.PluginKeys._
import com.mojolly.scalate.ScalatePlugin._
import com.typesafe.sbt.packager.archetypes.JavaAppPackaging
import ScalateKeys._
import org.flywaydb.sbt.FlywayPlugin._

object RevveriesappBuild extends Build {
  val Organization = "com.revveries"
  val Name = "revveries-app"
  val Version = "0.1.0-SNAPSHOT"
  val ScalaVersion = "2.11.6"
  val ScalatraVersion = "2.4.0.RC2-1"

  lazy val project = Project (
    "revveries-app",
    file("."),
    settings = ScalatraPlugin.scalatraWithJRebel ++ scalateSettings ++ flywaySettings ++ Seq(
      organization := Organization,
      name := Name,
      version := Version,
      scalaVersion := ScalaVersion,
      dependencyOverrides := Set(
        "org.scala-lang" %  "scala-library"  % scalaVersion.value,
        "org.scala-lang" %  "scala-reflect"  % scalaVersion.value,
        "org.scala-lang" %  "scala-compiler" % scalaVersion.value
      ),
      resolvers += Classpaths.typesafeReleases,
      resolvers += "Scalaz Bintray Repo" at "http://dl.bintray.com/scalaz/releases",
      libraryDependencies ++= Seq(
        "org.scalatra" %% "scalatra" % ScalatraVersion,
        "org.scalatra" %% "scalatra-scalate" % ScalatraVersion,
        "org.scalatra" %% "scalatra-specs2" % ScalatraVersion % "test",
        "ch.qos.logback" % "logback-classic" % "1.1.2" % "runtime",
        "org.eclipse.jetty" % "jetty-webapp" % "9.1.5.v20140505" % "compile;container",
        "org.eclipse.jetty" % "jetty-plus" % "9.1.5.v20140505" % "compile;container",
        "javax.servlet" % "javax.servlet-api" % "3.1.0",
        "org.scalatra" %% "scalatra-json" % "2.4.0.RC1",
        "org.json4s"   %% "json4s-jackson" % "3.3.0.RC1",
        "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
        "com.typesafe.slick" %% "slick" % "3.0.0-RC1",
        "c3p0" % "c3p0" % "0.9.1.2",
        "com.typesafe" % "config" % "1.3.0"
      ),
      flywayUrl := sys.props.getOrElse("JDBC_URL", default = sys.env("JDBC_URL")),
      scalateTemplateConfig in Compile <<= (sourceDirectory in Compile){ base =>
        Seq(
          TemplateConfig(
            base / "webapp" / "WEB-INF" / "templates",
            Seq.empty,  /* default imports should be added here */
            Seq(
              Binding("context", "_root_.org.scalatra.scalate.ScalatraRenderContext", importMembers = true, isImplicit = true)
            ),  /* add extra bindings here */
            Some("templates")
          )
        )
      }
    )
  ).enablePlugins(JavaAppPackaging)
}
