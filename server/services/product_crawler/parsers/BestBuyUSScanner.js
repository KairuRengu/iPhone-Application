'use strict'

var ProductLinkScanner = require('../ProductLinkScanner')
var ProductType = require('../../../model/ProductType')
var BestBuyUSScraperParser = require('../../../scrapers/BestBuyUSScraperParser')
var request = require('request')

// An implementation of the Hachette link scanner, returning data for books
// with high accuracy
class BestBuyUSScanner extends ProductLinkScanner {
  constructor() {
      super()
      this.SCAN_URL = 'http://www.bestbuy.com/site'
  }

  canAcceptLink(url) {
    return url.indexOf(this.SCAN_URL) > -1
  }

  getFriendlyName() {
    return 'Best Buy US';
  }

  getTypeOfProduct() {
      return ProductType.Game
  }

  scanLink(url, callback) {
    var parser = new BestBuyUSScraperParser()
    var options = {
      url: url,
      followAllRedirects: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
      }
    }
    request(options, (error, response, body) => {      
      var data = parser.getProductMetadataDetails(body)
      callback(data)
    })
  }
}

module.exports = BestBuyUSScanner
