'use strict'
var assert = require('chai').assert;
var ProductPricer = require('./ProductPricer')
var request = require('request')
var cheerio = require('cheerio')
var util = require('util')
var ProductPriceSnapshot = require('../model/ProductPriceSnapshot')
var qs = require('querystring');

/**
  Implements a ProductPricer that pulls from "The Price Geek" allowing for
  the pricing of items with little hassle. (http://www.thepricegeek.com/)
  The API implementation is simple on purpose to keep things reasonable.
  **NOTE: Remember, you must add unit tests if you change functionality**
*/
class PriceGeekProductPricer extends ProductPricer {
      constructor(html) {
        super()
        // HACK
        // This is an HTML over-ride which allows for injecting a custom
        // HTML document for unit testing. Do not use in production.
        this.html = html
      }

      /**
       * Gets the pricing information from a specific product, by utilizing
       * the price geek strategy.
       * @param  {Product} product The product to look up on PriceGeek
       * @return {callback}         A callback which contains product pricing information,
       * or null if an error was forced to be the thrown.
       * many properties, and can compute various values, such as medians, averages
       * and some samples prices.
       */
      getPricingInformationForProduct(product, callback) {
        assert(product != null)

        var that = this;
        this._getHTMLForProduct(product, function(html, error) {
          if(error) {
            callback(null);
          }
          try {
            var priceSnapshot = that._getProductPricingFromHTML(html);
            callback(priceSnapshot)
          }
          catch(e) {
            callback(null);
          }
        })
      }

      /**
       * Gets the HTML for a specific product, specified by the
       */
      _getHTMLForProduct(product, callback) {
        var productName = product.name

        if(!this.html) {
          var url = this._getUrlFromName(productName)
          request(url, function(error, response, body) {
            callback(body, error);
          })
        }
        else {
          // This is an HTML hack for allowing bypass
          callback(this.html, false)
        }
      }

      _getProductPricingFromHTML(html) {
        var $ = cheerio.load(html);
        var median = "";
        try {
          median = $(".median").text().replace("$", "")
        }
        catch(e) {
          // This case is normal, it's likely that the element just wasn't found
          console.log('PriceGeekProductPricer - failed to find median; no hits found?')
          return null;
        }

        // Rest of the stats are rolled up inside of the product-stats-detail
        // var $productDetails = $(".product-stats-detail")
        // var productPrices = []
        // $productDetails.each(function(index, $element) {
        //   $element.find('strong').each(function(sIndex, $sElement) {
        //       productPrices.push($sElement.text().replace("$", ""))
        //   })
        // })

        // Grab the price snapshot, deal with the rest later
        var priceSnapshot = new ProductPriceSnapshot(0, parseFloat(median), 0)
        return priceSnapshot;
      }

      /**
       * For some things on ThePriceGeek, there may be multiples of some kinds
       * of games, such as Final Fantasy X [PS2] or Final Fantasy X, PS4.
       * The more specific you are, the better.
       * @param  {[type]} product [description]
       * @return {[type]}         [description]
       */
      _getExtraTagsRequiredForProduct(product) {
        //TODO: Can we find out anything else from this?
      }

      /**
       * Gets the URL from the name of the product so a request could be generated.
       * @param  {string} name The name of the product
       * @return {string}      The URL of the product
       */
      _getUrlFromName(name) {
        return util.format("http://www.thepricegeek.com/results/%s?country=ca", encodeURIComponent(name));
      }

}

module.exports = PriceGeekProductPricer
