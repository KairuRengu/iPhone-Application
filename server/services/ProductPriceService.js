'use strict'

var MemoryCache = require('../dal/MemoryCache')
var assert = require('chai').assert

class ProductPriceService {
  /**
   * [constructor description]
   * @param  {productPricer} productPricer The pricer to use in the event that we need to search the web for this information
   * @return {null}               there is no return values
   */
  constructor(productPricer) {
    this._productPricer = productPricer
    this._cache = new MemoryCache()
  }

  getPriceSnapshotForProduct(product, callback) {
    assert.isNotNull(product)
    var snapshot = this._findInCache(product)
    if(snapshot) {
      callback(snapshot)
      return
    }

    // Otherwise, we'll need to head out the pricing service and go from there
    this._productPricer.getPricingInformationForProduct(product, (pricing) => {
      if(pricing != null) {
        this._cache.addToCache(product.name, pricing)
      }
      callback(pricing)
    })
  }

  _findInCache(product) {
    return this._cache.get(product.name)
  }
}

module.exports = ProductPriceService
