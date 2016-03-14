'use strict'
var iclient = require("node-incandescent-client").client;

/**
 * A lookup strategy for finding information about a product based off the image
 * lookup service Incandescent.
 */
class IncandescentLookupStrategy {
  constructor() {
    //TODO: Fill me in with real configuration
    this.userId = "6788"
    this.apiKey = "fae54e5101284341d4132bdd2ab7f29a"

    // This is the URL queue
    this._urlQueue = []
  }

  /**
   * Queues a URL for lookup against the Incandescent servers. This does not
   * actually fire a lookup, batch requests are cheaper so it makes more sense
   * to queue up all the requests at once where possible.
   */
  queueUrl(url) {
    this._urlQueue.push(url)
  }

  getQueueSize() {
    return this._urlQueue.length
  }

  /**
   * Fetches product information from the queue and then returns data.
   */
  fetchProductInformationFromQueue(callback) {
    if(this._urlQueue.length == 0) {
      return false;
    }

    var client = new iclient(this.userId, this.apiKey)
    this._urlQueue.forEach((url) => {
      client.addImageUrl(url)
    })

    // Requires generating a header
    client.assemble()

    client.sendRequest(function(projectId) {
    	console.log(projectId);
    	client.getResults(projectId, function(data) {
    		console.log(data);
        callback(data)
    	})
    });

    // Otherwise, kicked off
    return true;
  }

}

module.exports = IncandescentLookupStrategy
