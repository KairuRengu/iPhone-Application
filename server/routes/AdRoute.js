'use strict'

var ImageUploader = require('../lib/ImageUploader')
var AdService = require('../services/AdService')
var os = require('os')
var multer = require('multer')


class AdRoute {
  constructor(server) {
    this.server = server
    this.service = new AdService()
    // Handles the posting of an add
    this.server.post('/ad/post', multer({ dest: os.tmpdir()}).single('upl'), (request, resource, next) => {
        this._onPOSTAd(request, resource, next)
    })
  }

  _onPOSTAd(request, resource, next) {
    var imageUploaded, imagePath
    try {
       imageUploaded = request.files.image
       imagePath = imageUploaded.path
    } catch(e) {
      console.log('/search: image was not attached, so aborting the request')
      resource.status(400)
      resource.send({status: false})
      return
    }

    // Get the advertisement body
    var adBody = request.params

    // Upload the image
    var uploader = new ImageUploader('')
    uploader.uploadImageFromDisk(imagePath, (imgurUrl) => {
        adBody.image = imgurUrl
        console.log(request.body)
        this.service.ebay(adBody, (valid) => {
          if(valid) {
            resource.send({status: true})
          } else {            
            resource.send({status: false})
          }
        })
    })
  }
}

module.exports = AdRoute
