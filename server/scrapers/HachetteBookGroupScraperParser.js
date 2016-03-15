'use strict'
var cheerio = require('cheerio')
var url = require('url')
var ProductMetadata = require('../model/ProductMetadata')
var ProductType =  require('../model/ProductType')

class HachetteBookGroupScraperParser {
  constructor() {
  }

  getProductMetadataDetails(htmlString) {
    var $ = cheerio.load(htmlString)
    var $title = $('h1')
    var $img = $title.prev()
    var $description = $title.siblings('p').eq(0)

    var data = new ProductMetadata()
    data.title = $title.text()
    data.description = $description.text()
    data.productType = ProductType.Book

    var imageUrl = $img.attr('src')
    imageUrl = url.resolve('http://www.hachettebookgroup.com/', imageUrl)
    data.addAttachment(imageUrl)

    return data
  }
}

module.exports = HachetteBookGroupScraperParser
