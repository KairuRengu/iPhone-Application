// Main entry point for the application
// Vaughan Hilts, Kyle Leng @ 2016
// Provides a basic service for finding the values of items by simply taking
// a picture of them, and then getting a price, while allowing you to post
// an ad.

'use strict'

var path = require('path')
var restify = require('restify')

// This is required
restify.CORS.ALLOW_HEADERS.push('auth');

class Application {
  constructor() {
    console.log('Pricing server is starting up...')

    // Initialize the RESTify Express server...
    this.server = restify.createServer()

    this._registerMiddleware()

    // Prevents us from getting garbage collected
    this._routes = []
    this._registerRoutes()

    // Start server up on API port
    this.server.listen(2740, () => {
      console.log('API Server is now listening on port %d', 2740)
    })
  }

_registerMiddleware() {
  this.server
    .use(restify.CORS({ headers: [ 'auth' ], origins: ['*'] }))
    .use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(restify.queryParser())
    .use(restify.authorizationParser());
  }

 _registerRoutes() {
    // Setup all the routes using a recursive directory read and requiring all the routes; causing their callbacks to be triggered
    var normalizedPath = path.join(__dirname, "routes");
    require("fs").readdirSync(normalizedPath).forEach((file) => {
      var pathToRegister = "./routes/" + file
      console.log(" Registering route file: " + file)
      var c = require(pathToRegister);
      var route = new c(this.server)
      this._routes.push(route)
    });
  }

}

var main = new Application()
