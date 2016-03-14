'use strict'

var request = require('request')
var cheerio = require('cheerio')
var util = require('util')

/**
 * Implements a reverse lookup strategy that uses the Google Reverse Image
 * lookup API to perform it's search. This form of lookup is actually
 * not completely within the terms of services
 */
class GoogleLookupStrategy {
  constructor() {
    this.url = "http://images.google.com/searchbyimage?image_url=%s"
    this._urlQueue = []
  }

  queueUrl(url) {
    this._urlQueue.push(url)
  }

  getQueueSize() {
    return this._urlQueue.length
  }

  fetchProductInformationFromQueue(callback) {
    if(this._urlQueue.length == 0) {
      return false;
    }

    var workingUrl = this._urlQueue.pop()
    workingUrl = util.format(this.url, workingUrl)
    var options = {
      url: workingUrl,
      followAllRedirects: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
      }
    }

    request(options, function(error, response, body) {
      var $ = cheerio.load(body);
      // The best guess is going to be in this tag...
      callback($('._gUb').text())
    })
    return true;
  }
}

module.exports = GoogleLookupStrategy
