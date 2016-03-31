'use strict'

var ProductLinkScanner = require('../ProductLinkScanner')
var ProductType = require('../../../model/ProductType')
var AllMusicScraperParser = require('../../../scrapers/AllMusicScraperParser')
var request = require('request')

// An implementation of the Hachette link scanner, returning data for books
// with high accuracy
class AllMusicLinkScanner extends ProductLinkScanner {
  constructor() {
      super()
      this.SCAN_URL = 'www.allmusic.com/album/'
  }

  canAcceptLink(url) {
    return url.indexOf(this.SCAN_URL) > -1
  }

  getFriendlyName() {
    return 'AllMusic Album Database';
  }

  getTypeOfProduct() {
      return ProductType.Music
  }

  scanLink(url, callback) {
    var parser = new AllMusicScraperParser()
    request(url, (error, response, body) => {
      var data = parser.getProductMetadataDetails(body)
      callback(data)
    })
  }
}

module.exports = AllMusicLinkScanner
