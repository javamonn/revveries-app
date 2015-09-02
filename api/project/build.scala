import sbt._
import Keys._
import org.scalatra.sbt._
import org.scalatra.sbt.PluginKeys._
import com.mojolly.scalate.ScalatePlugin._
import com.typesafe.sbt.packager.archetypes.JavaAppPackaging
import com.typesafe.sbt.packager.docker._
import ScalateKeys._
import org.flywaydb.sbt.FlywayPlugin._
import com.typesafe.sbt.SbtNativePackager.autoImport._
import NativePackagerKeys._

object RevveriesappBuild extends Build {
  val Organization = "com.revveries"
  val Name = "revveries-api"
  val Version = "0.1.0-SNAPSHOT"
  val ScalaVersion = "2.11.6"
  val ScalatraVersion = "2.4.0.RC2-1"
  val Root = Project("revveries-app", file("."))
  lazy val project = Project (
    "revveries-app",
    file("."),
    settings = ScalatraPlugin.scalatraWithJRebel ++ scalateSettings ++ flywaySettings ++ Seq(
      organization := Organization,
      name := Name,
      version := Version,
      scalaVersion := ScalaVersion,
      dockerUpdateLatest:= true,
      dockerRepository := Some("javamonn"),
      dockerCommands  := Seq(
        Cmd("FROM", "java:8"),
        Cmd("WORKDIR", "/opt/docker"),
        Cmd("ADD", "opt /opt"),
        Cmd("RUN", """["chown", "-R", "daemon:daemon", "."]"""),
        // expose kubernetes secrets as env vars
        Cmd("USER", "daemon"),
        Cmd("CMD", "for file in /etc/secret/*; do /bin/bash -c \"source $file\"; done && bin/revveries-api")
      ),
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
        "org.scalatra" %% "scalatra-json" % ScalatraVersion,
        "org.json4s"   %% "json4s-jackson" % "3.3.0.RC1",
        "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
        "com.typesafe.slick" %% "slick" % "3.0.0-RC1",
        "com.typesafe.slick" %% "slick-codegen" % "3.0.0",
        "c3p0" % "c3p0" % "0.9.1.2",
        "com.typesafe" % "config" % "1.3.0",
        "org.scalatra" %% "scalatra-scalatest" % "2.4.0.RC1" % "test",
        "org.flywaydb" % "flyway-core" % "3.2.1"
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
  ).enablePlugins(JavaAppPackaging, DockerPlugin)


}
