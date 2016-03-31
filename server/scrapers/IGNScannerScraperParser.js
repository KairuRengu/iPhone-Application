'use strict'
var cheerio = require('cheerio')
var url = require('url')
var ProductMetadata = require('../model/ProductMetadata')
var ProductType =  require('../model/ProductType')

class IGNScraperParser {
  constructor() {
  }

  getProductMetadataDetails(htmlString) {
    var $ = cheerio.load(htmlString)
    var data = new ProductMetadata()

    var $header = $(".contentTitle a")
    data.title = $header.text().trim()

    var $info = $(".gameInfo p")
    data.description = $info.text().trim()

    data.productType = ProductType.Game

    // TODO: Get attachments as required
    var $img = $('.mainBoxArt img')
    var imageUrl = $img.attr('src')
    data.addAttachment(imageUrl)

    return data
  }
}

module.exports = IGNScraperParser
