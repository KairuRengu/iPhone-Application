var assert = require('chai').assert
var ImageHasher = require('../lib/ImageHasher')

describe('ImageHasher', function() {
  describe('#getImageBase64String', (done) => {
    var hasher = new ImageHasher()
    it('should return a proper encoding for a file that exists', (done) => {
      hasher.getImageBase64String("res/homura.jpg", (hash) => {
        assert(hash === '0abed64929fcb3e713b4830b9e18387af818a7062921f3aaeb5a38a1110fe162')
        done()
      })
    })

    it('should return null if the file is missing', (done) => {
      hasher.getImageBase64String('res/homura', (hash) => {
        assert.isNull(hash)
        done()
      })
    })
  })
})
