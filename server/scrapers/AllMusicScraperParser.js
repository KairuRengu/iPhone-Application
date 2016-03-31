'use strict'
var cheerio = require('cheerio')
var url = require('url')
var ProductMetadata = require('../model/ProductMetadata')
var ProductType =  require('../model/ProductType')

class AllMusicScraperParser {
  getProductMetadataDetails(htmlString) {
    var $ = cheerio.load(htmlString)
    var data = new ProductMetadata()

    var $title = $(".album-title")
    data.title = $title.text().trim()
    data.productType = ProductType.Music

    var $img = $(".album-contain img")
    var imageUrl = $img.attr('src')
    data.addAttachment(imageUrl)

    return data
  }
}

module.exports = AllMusicScraperParser
