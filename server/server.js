// Main entry point for the application
// Vaughan Hilts, Kyle Leng @ 2016
// Provides a basic service for finding the values of items by simply taking
// a picture of them, and then getting a price, while allowing you to post
// an ad.

'use strict'

var path = require('path')

class Application {

  constructor() {
    console.log('Pricing server is starting up...')

    this._registerRoutes()
  }

 _registerRoutes() {
    // Setup all the routes using a recursive directory read and requiring all the routes; causing their callbacks to be triggered
    var normalizedPath = path.join(__dirname, "routes");
    require("fs").readdirSync(normalizedPath).forEach(function(file) {
      var pathToRegister = "./routes/" + file
      console.log("Registering route file: " + file)
      require(pathToRegister)(server);
    });
  }

}

var main = new Application()
