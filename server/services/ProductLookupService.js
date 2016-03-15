'use strict'

var Product = require('../model/Product')

/**
 * Provides facilities for looking up a product and the various tags assosciated
 * with it.
 */
class ProductService {
  constructor(lookupStrategy) {
    this.strategy = strategy
  }

  getProductByImageUrl(imageUrl, callback) {
    // TODO: Fill in an actual product here for the user to make use of
    callback(null)
  }

  getProductPrice(product) {

  }

  getProductDetails() {

  }

}

module.exports = ProductService
