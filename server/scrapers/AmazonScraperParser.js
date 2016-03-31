'use strict'

var cheerio = require('cheerio')
var url = require('url')
var ProductMetadata = require('../model/ProductMetadata')
var ProductType =  require('../model/ProductType')

class AmazonScraperParser {
  constructor() {
  }

  getProductMetadataDetails(htmlString) {
    var $ = cheerio.load(htmlString)
    var data = new ProductMetadata()

    // Title is a short-title
    data.title = this._scanForTitle($)

    // Description is in an iFrame, it'll be tough to get out
    // TODO: Do something about this at some point if we end up
    // relying on the Amazon data. However, other resources can often
    // get this for us so we should not worry too much.

    var categoryText = $('.nav-search-label').text()
    data.productType = this._resolveProductTypeFromCategoryString(categoryText)

    var $img = $("#img-canvas img").first()
    var imageUrl = $img.attr('src')
    data.addAttachment(imageUrl)
    return data
  }

  _resolveProductTypeFromCategoryString(categoryString) {
    switch(categoryString) {
        case "Books":
        case "Kindle Store":
          return ProductType.Book
          break;
        case "Video Games":
          return ProductType.Game
          break;
        case "Movies & TV":
          return ProductType.Movie
          break;
    }
    return undefined
  }

  _scanForTitle($) {
    var titleTags = ['productTitle', 'ebooksProductTitle']
    var titleText = null
    titleTags.forEach((tag) => {
      var $title = $('#' + tag)
      if($title.length > 0) {
        titleText = titleText || $title.text()
      }
    })
    return titleText
  }

}

module.exports = AmazonScraperParser
