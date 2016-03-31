'use strict'

var _ = require('lodash')
var log = require('npmlog')
var ProductMetadata = require('../../model/ProductMetadata')

/**
 * Given a set of related URLs and some target metadata to find, will attempt
 * to find any related information that is possible on the product given the
 * assosciated meta-data.
 */
class ProductDetailsCrawler {
  constructor(scanners) {
    // The scanners to be used by this product crawler
    this._scanners = scanners || []
  }

  getProductDetailsForUrls(urls, callback) {
    var data = new ProductMetadata()
    log.info('Product crawler', 'Starting search for additional product info...')
    // If urls is empty, return nothing
    if(urls.length === 0) {
      callback(data)
      log.warn('Product crawler', 'Failed to find any matches!')
    }

    log.info('Product crawler','Attempting to parse URLs:')
    log.info('Product crawler', urls)

    var returned = 0
    urls.forEach((url) => {
      this._getProductDetailFromUrl(url, (newData) => {
        if(newData) {
          data = this._inheritMetadata(data, newData)
        }
        returned++
        if(returned === (urls.length)) {
          callback(data)
          return
        }
      })
    })
  }

  /**
   * Adds a detail scanner to the crawler for usage.
   * @param {[DetailScanner]} scanner The scanner to add the details crawler
   */
  addDetailScanner(scanner) {
    this._scanners.push(scanner)
  }

  /**
   * Finds a scanner for a particular URL and then tries to extract the data
   * from it.
   * @param  {[type]} url [description]
   * @return {[type]}     [description]
   */
  _getProductDetailFromUrl(url, callback) {
    var toAttempt = []
    this._scanners.forEach((scanner) => {
      if(scanner.canAcceptLink(url)) {
        toAttempt.push(scanner)
      }
    })

    if(toAttempt.length > 0) {
      toAttempt.forEach((scanner) => {
        scanner.scanLink(url, (newData) => {
          log.info('Product Crawler', 'Scanner [%s] processed some new data.', scanner.getFriendlyName())
          callback(newData)
        })
      })
    }
    else {
      log.info('Product Crawler', 'Scanner was not found to process %s', url)
      callback(null)
    }
  }

  _inheritMetadata(prev, next) {
    _.defaultsDeep(prev, next)
    if(next['attachments']) {
      next.attachments.forEach((attachment) => {
        prev.attachments.push(attachment)
      })
    }
    return prev
  }

}

module.exports = ProductDetailsCrawler
