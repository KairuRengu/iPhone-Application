'use strict'

var ProductPricer = require('ProductPricer')
var request = require('request')

/**
  Implements a ProductPricer that pulls from "The Price Geek" allowing for
  the pricing of items with little hassle. (http://www.thepricegeek.com/)
  The API implementation is simple on purpose to keep things reasonable.
*/
class PriceGeekProductPricer extends ProductPricer {
      constructor() {

      }

      /**
       * Gets the pricing information from a specific product, by utilizing
       * the price geek strategy.
       * @param  {Product} product The product to look up on PriceGeek
       * @return {ProductPriceInfo}         The product price info to find, holds
       * many properties, and can compute various values, such as medians, averages
       * and some samples prices.
       */
      getPricingInformationForProduct(product) {

      }

      /**
       * Gets the HTML for a specific product, specified by the
       * @return {[type]} [description]
       */
      _getHTMLForProduct(product) {
        var productName = product.name;
        request()
      }

      /**
       * For some things on ThePriceGeek, there may be multiples of some kinds
       * of games, such as Final Fantasy X [PS2] or Final Fantasy X, PS4.
       * The more specific you are, the better. 
       * @param  {[type]} product [description]
       * @return {[type]}         [description]
       */
      _getExtraTagsRequiredForProduct(product) {

      }
}

module.exports = PriceGeekProductPricer
