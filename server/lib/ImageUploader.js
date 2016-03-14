'use strict'
var imgur = require('imgur-node-api')
var fs = require('fs')

/**
 * Uploads a file on the disk (usually in memory) to a web service somewhere
 * so it can be access on the WWW in some fashion. The default implementation
 * uses Imgur.
 */
class ImageUploader {
    constructor(secretKey) {
      // do something here if needed
      this.secretKey = secretKey
    }

    uploadImageFromDisk(filename, callback) {
      // NOTE: This *SHOULD* be top secret...
      fs.exists(filename, (exists) => {
        if(exists) {
          imgur.setClientID('c2d5a8985658955')
          imgur.upload(filename, function(error, resource) {
            if(!error) {
              callback(resource.data.link)
            } else {
              callback(null)
            }
          })
        }
        else {
          callback(null);
        }
      })

    }

    uploadImageFromUrl(url) {
        throw Error('operation not supported')
    }

}

module.exports = ImageUploader
