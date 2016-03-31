'use strict'
var cheerio = require('cheerio')
var url = require('url')
var ProductMetadata = require('../model/ProductMetadata')
var ProductType =  require('../model/ProductType')

class BestBuyUSScraperParser {
  constructor() {
  }

  getProductMetadataDetails(htmlString) {
    var $ = cheerio.load(htmlString)
    var data = new ProductMetadata()

    // Begin parsing
    var $header = $("#sku-title h1")
    var titleText = $header.text().split("-")[0]
    data.title = titleText

    var $description = $("#synopsis")
    data.description = $description.text()

    // Best Buy carries over stuff other than games, so there will be a small
    // level of complexity required to do this
    data.productType = this._categorizePage($)

    var $img = $(".gallery-item img")
    var imageUrl = $img.attr('src')
    data.addAttachment(imageUrl)

    return data
  }

  /**
   * Returns a category for the page based on the current DOM.
   * @return {[ProductType]} The product type that is of the current page
   */
  _categorizePage($) {
    var productType = undefined
    var that = this
    $("#hierarchy li a").each(function(index, element) {
      element = $(element)
      if(productType == undefined) {
        productType = that._tryToDetectProductTypeBasedOnString(element.text())
      }
    })
  }

  _tryToDetectProductTypeBasedOnString(s) {
    switch(s) {
      case "Video Games":
        return ProductType.Game;
        break;
      case "All":
        break;
    }
    return undefined;
  }
}

module.exports = BestBuyUSScraperParser
