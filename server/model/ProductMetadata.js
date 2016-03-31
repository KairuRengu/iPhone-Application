'use strict'

var _ = require('lodash')
var MetadataAttachment = require('./MetadataAttachment')

/**
 * This class simply stores some 'extra' data about stuff that is being stored
 * and allows for extra carried data.
 */
class ProductMetadata {
  constructor() {
    // These are most likely images, though their types could be anything...
    // in some cases, it makes sense to add video or other rich content
    // NOTE: You should not access this directly, it's considered bad practice
    // as there is a method below that encapsulates how these are added and handled
    this.attachments = []

    // These are just some things we're interested in, which could come in handy
    this.title = undefined
    this.description = undefined
    this.productType = undefined
  }

  /**
   * Adds a resource (URL) as an attachment. The parser will take care of figuring
   * out the actual type
   * @param {[string]} resource The URL to the resource we care about
   */
  addAttachment(resourceURL) {
    if(!resourceURL)
      return
      
    var attachment = new MetadataAttachment(resourceURL)
    this.attachments.push(attachment)
  }

  isComplete() {
    return !_.isUndefined(this.title) &&  !_.isUndefined(this.description) && !_.isUndefined(this.productType)
  }

}

module.exports = ProductMetadata
