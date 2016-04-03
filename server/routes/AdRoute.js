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
    // var imageUploaded, imagePath
    // try {
    //    imageUploaded = request.files.image
    //    imagePath = imageUploaded.path
    // } catch(e) {
    //   console.log('/search: image was not attached, so aborting the request')
    //   resource.status(400)
    //   resource.send({error: 'No image was attached'})
    //   return
    // }

    // TODO: Do something about this
    var imagePath = "/tmp/upload_ff18116c620b1d359e130b55e21dffdf"

    // Get the advertisement body
    var adBody = request.body

    // Upload the image
    var uploader = new ImageUploader('')
    uploader.uploadImageFromDisk(imagePath, (imgurUrl) => {
        adBody.image = imgurUrl
        this.service.ebay(adBody, (valid) => {
          if(valid) {
            resource.send({status: "OK. Ad posted!"})
          } else {
            resource.status(400)
            resource.send()
          }
        })
    })
  }
}

module.exports = AdRoute
