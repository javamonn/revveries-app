# revveries.com #
![Build Status](https://travis-ci.org/javamonn/revveries-app.svg?branch=master)

Code running [revveries.com](http://revveries.com), a photography portfolio and private CMS.

Arguably over-engineered as this was intended as a learning project and chance to deploy several new technologies that I hadn't worked with previously. 

### Architecture ###

- `/api` - [Scalatra](http://scalatra.org/) REST API using [Slick](http://slick.lightbend.com/) to interact with a PostgreSQL instance. Has full test coverage under `./api/src/test`. Generates a dockerized `.war` for deployment.
- `/app` - [React](https://facebook.github.io/react/) SPAs responsible for the UI of the photography portfolio and CMS. Uses [Browserify](http://browserify.org/) for bundling, [Babel](https://babeljs.io/) for ES6, and [Reflux](https://github.com/reflux/refluxjs) for state managment.
- `/db` - Dockerized PostgreSQL instance used for gallery and picture persistence.
- `/www` - Dockerized Nginx proxy used for a reverse-proxy and static asset cache.
- `/kube` - [Kubernetes](http://kubernetes.io/) configuration files used for deployment. [revveries.com](http://revveries.com) is currently hosted on [Google Container Engine](https://cloud.google.com/container-engine/).

### Build & Run ###

```sh
$ npm install
$ gulp 
$ ./sbt
> container:start
```

## Run the Tests ##
```sh
$ gulp spec
$ ./sbt
> test
```

## Deployment ##

`./api` deployment:
- `$ ./api/sbt docker:publish`

`./app` deployment:
- `$ cd ./app && gulp deploy`
