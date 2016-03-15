var mutler = require('mutler')
var ProductService = require('../services/ProductService')
var ImageUploader = require('../lib/ImageUploader')
var ImageHasher = require('../lib/ImageHasher')

/**
 * A route allowing for product details and the client to get information regarding
 * these.
 */
class ProductSearchRoute {
  constructor(server) {
    this.server = server
    this.productService = new ProductService()
    this.setup()
  }

  setup() {
    // Handles the post image route
    this.post('/search', multer({ dest: os.tmpdir()}).single('upl'), (request, resource, next) {
        this._onPOSTImageSearch(request, resource, next)
    })
  }

  _onPOSTImageSearch(request, resource, next) {
    var imageUploaded = request.files.image
    var imagePath = imageUploaded.path

    var uploader = new ImageUploader('')
    uploader.uploadImageFromDisk(imagePath, (url) => {
        this.productService.getProductByImageUrl(url, (product) => {
          if(product) {
            req.send(product)
          }
          else {
            // If the product came back null, chances are we could not find
            // enough information to identify it as a product, so we do not bother
            req.send(404)
          }
        })
    })
  }

  _fetchProductFromCache() {

  }

}

module.exports = ProductSearchRoute
