'use strict'

var MemoryCache = require('../dal/MemoryCache')
var ImageHasher = require('../lib/ImageHasher')
var Product = require('../model/Product')
var ImageUploader = require('../lib/ImageUploader')
var ProductDetailsCrawler = require('../services/product_crawler/ProductDetailsCrawler')

// Some scanners, which I'm not sure if they belong in this class, but yeah...
// There's likely a better way to configure this
var HachetteLinkScanner = require('../services/product_crawler/parsers/HachetteLinkScanner')
var AmazonLinkScanner = require('../services/product_crawler/parsers/AmazonLinkScanner')
var BestBuyUSScanner = require('../services/product_crawler/parsers/BestBuyUSScanner')
var IGNScanner = require('../services/product_crawler/parsers/IGNScanner')

/**
 * Provides facilities for looking up a product
 */
class ProductService {
  constructor(lookupStrategy) {
    this.strategy = lookupStrategy
    var scanners = [new HachetteLinkScanner(), new IGNScanner(),
      new AmazonLinkScanner(), new BestBuyUSScanner()]

    this._productCrawler = new ProductDetailsCrawler(scanners)

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
          // Add to the cache, too w hile we're at it
          this._cache.addToCache(hash, product)
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
      this.strategy.fetchProductInformationFromQueue((guess, links) => {
        this._productCrawler.getProductDetailsForUrls(links, (metadata) => {
          var product = new Product(guess)
          product.mixInMetadata(metadata)
          callback(product)
        })
      })
    })
  }

  getProductPrice(product) {
    // TODO: Get the product pricing information
    throw Error('not implemented yet')
  }
}

module.exports = ProductService
