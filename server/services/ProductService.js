'use strict'

var MemoryCache = require('../dal/MemoryCache')
var ImageHasher = require('../lib/ImageHasher')
var Product = require('../model/Product')

/**
 * Provides facilities for looking up a product
 */
class ProductService {
  constructor(lookupStrategy) {
    this.strategy = strategy

    // HACK: Who is responsible for the caching mechanism? I don't know for sure
    // but for now this is fine
    this._cache = new MemoryCache()
  }

  getProductByImageFilename(filename, callback) {
    var hasher = new ImageHasher()
    hasher.getImageBase64String(filename, (hash) => {
      var product = this._cache.get(hash)
      if(product != null) {
        callback(product)
      } else {
        this._fetchProductFromImage(filename, (product) => {
          callback(product)
        })
      }
    })
  }

  // The internal implementation to actually implement this
  _fetchProductFromImage(filename, callback) {
    var uploader = new ImageUploader('')
    uploader.uploadImageFromDisk(filename, (imgurUrl) => {
      // With this, we'll go on to fetch the best guess now...
      this.strategy.queueUrl(imgurUrl)
      this.strategy.fetchProductInformationFromQueue((guess) => {
        // TODO: More pipeline information is probably needed here to figure
        // out the specifics of how everything is going to work... such as how
        // we're going to feed more data into it for more accurate lookups
        var product = new Product(guess, null)
        callback(product)
      })
    })
  }

  getProductPrice(product) {
    // TODO: Get the product pricing information
    throw Error('not implemented yet')
  }
}

module.exports = ProductService
