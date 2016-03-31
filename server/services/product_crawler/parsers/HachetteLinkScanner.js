'use strict'

var ProductLinkScanner = require('../ProductLinkScanner')
var ProductType = require('../../../model/ProductType')
var HachetteBookGroupScraperParser = require('../../../scrapers/HachetteBookGroupScraperParser')
var request = require('request')

// An implementation of the Hachette link scanner, returning data for books
// with high accuracy
class HachetteLinkScanner extends ProductLinkScanner {
  constructor() {
      super()
      this.SCAN_URL = 'http://www.hachettebookgroup.com/titles'
  }

  canAcceptLink(url) {
    return url.indexOf(this.SCAN_URL) > -1
  }

  getFriendlyName() {
    return 'Hatchette Book Group';
  }

  getTypeOfProduct() {
      return ProductType.Book
  }

  scanLink(url, callback) {
    var parser = new HachetteBookGroupScraperParser()
    request(url, (error, response, body) => {
      var data = parser.getProductMetadataDetails(body)
      callback(data)
    })
  }
}

module.exports = HachetteLinkScanner
