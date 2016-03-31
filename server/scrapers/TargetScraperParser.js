'use strict'
var cheerio = require('cheerio')
var url = require('url')
var ProductMetadata = require('../model/ProductMetadata')
var ProductType =  require('../model/ProductType')

class TargetScraperParser {
  constructor() {
  }

  getProductMetadataDetails(htmlString) {
    var $ = cheerio.load(htmlString)
    var data = new ProductMetadata()

    var $description = $(".details-copy span")
    data.description = $description.text().trim()

    return data
  }
}

module.exports = TargetScraperParser
