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

  /**
   * This operation will overwrite all the data on the product. Only call it
   * after you require a brand new product data, without any other additional
   * context. You will *LOSE* all properties on this product instance.
   * @param  {[type]} metadata [description]
   * @return {[type]}          [description]
   */
  mixInMetadata(metadata) {
    _.assign(this, metadata)
  }

}

module.exports = Product
