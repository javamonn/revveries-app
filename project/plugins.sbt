addSbtPlugin("com.mojolly.scalate" % "xsbt-scalate-generator" % "0.5.0")
addSbtPlugin("org.scalatra.sbt" % "scalatra-sbt" % "0.3.5")
addSbtPlugin("me.lessis" % "bintray-sbt" % "0.1.1")
addSbtPlugin("au.com.onegeek" %% "sbt-dotenv" % "1.1.29")

resolvers += "Flyway" at "http://flywaydb.org/repo"
addSbtPlugin("org.flywaydb" % "flyway-sbt" % "3.2.1")
