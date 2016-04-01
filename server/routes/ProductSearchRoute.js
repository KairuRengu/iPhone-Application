'use strict'

var multer = require('multer')
var os = require('os')
var ProductService = require('../services/ProductService')
var ProductPriceService = require('../services/ProductPriceService')
var PriceGeekProductPricer = require('../lib/PriceGeekProductPricer')
var ImageHasher = require('../lib/ImageHasher')
var GoogleLookupStrategy = require('../lib/GoogleLookupStrategy')

/**
 * A route allowing for product details and the client to get information regarding
 * these.
 */
class ProductSearchRoute {
  constructor(server) {
    this.server = server
    this.productService = new ProductService(new GoogleLookupStrategy())
    this._priceService = new ProductPriceService(new PriceGeekProductPricer())
    this.setup()
  }

  setup() {
    // Handles the post image route
    this.server.post('/search', multer({ dest: os.tmpdir()}).single('upl'), (request, resource, next) => {
        this._onPOSTImageSearch(request, resource, next)
    })

    this.server.post('/search/price', (request, resource, next) => {
      this._onPriceRequest(request, resource, next)
    })
  }

  _onPOSTImageSearch(request, resource, next) {
    var imageUploaded, imagePath
    try {
       imageUploaded = request.files.image
       imagePath = imageUploaded.path
    } catch(e) {
      console.log('/search: image was not attached, so aborting the request')
      resource.status(400)
      resource.send({error: 'No image was attached'})
      return
    }

    this.productService.getProductByImageFilename(imagePath, (product) => {
      if(product) {
        resource.send(product)
      }
      else {
        // If the product came back null, chances are we could not find
        // enough information to identify it as a product, so we do not bother
        resource.send(404)
      }
    })
  }

  _onPriceRequest(request, resource, next) {
    var product = request.body
    var service = this._priceService
    service.getPriceSnapshotForProduct(product, (pricing) => {
      if(pricing) {
        resource.status(200)
        resource.send(pricing)
        console.log(pricing)
      } else {        
        resource.send(404)
      }
    })
  }
}

module.exports = ProductSearchRoute
