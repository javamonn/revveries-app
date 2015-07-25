/**
 * I want an ocaml functor here, this should get "mixed in" with a Tables.[X] type,
 * not sure how to get that as a class paramter here either. 
 *
 *
 */
//class RestSpec(table: classOf extends ScalatraSpec {
  //protected implicit lazy val jsonFormats: Formats = 
    //DefaultFormats.withCompanions(classOf[Tables.GalleriesRow] -> Tables)

  //override def afterAll = {
    //connection.close
    //super.afterAll()
  //}
  
  //val connection = new TestDatabaseConnection(
    //sys.props.getOrElse("JDBC_TEST_URI", default = sys.env("JDBC_TEST_URI")),
    //sys.props.getOrElse("JDBC_TEST_BASE_URL", default = sys.env("JDBC_TEST_BASE_URL")),
    //sys.props.getOrElse("JDBC_TEST_USER", default = sys.env("JDBC_TEST_USER")),
    //sys.props.getOrElse("JDBC_TEST_PASSWORD", default = sys.env("JDBC_TEST_PASSWORD"))
  //)
  //val db = connection.open
  //connection.populateTestDatabase
//}
