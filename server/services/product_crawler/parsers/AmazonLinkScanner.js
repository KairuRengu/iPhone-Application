'use strict'

var ProductLinkScanner = require('../ProductLinkScanner')
var ProductType = require('../../../model/ProductType')
var AmazonScraperParser = require('../../../scrapers/AmazonScraperParser')
var request = require('request')

// An implementation of the Amazon US Scraper, returning general product data
// with high accuracy. It acts as a good catch all as it categorizes data
// on almost all newer products still sold today.
class HachetteLinkScanner extends ProductLinkScanner {
  constructor() {
      super()
      this.REGEX = 'amazon.com\/(.*)\/dp'
  }

  canAcceptLink(url) {
    // The latter expression is for blacklisting bad sellers
    return url.match(this.REGEX) != null && url.indexOf('DV-P') == -1
  }

  getFriendlyName() {
    return 'Amazon US Scraper';
  }

  getTypeOfProduct() {
      return ProductType.Game
  }

  scanLink(url, callback) {
    var parser = new AmazonScraperParser()
    request(url, (error, response, body) => {
      var data = parser.getProductMetadataDetails(body)
      callback(data)
    })
  }
}

module.exports = HachetteLinkScanner
