'use strict'

var _ = require('lodash')

/**
 * Represents a product and the various encapsulated information. We try not
 * to store too much information here unless it is completely required.
 */
class Product {
  constructor(name) {
    this.productType = undefined;
    this.name = name;
  }

  setProductPrice(productPriceSnapshot) {
    this.productPricingInfo = productPriceSnapshot;
  }

  mixInMetadata(metadata) {
    _.assign(this, metadata)
  }
}

module.exports = Product
