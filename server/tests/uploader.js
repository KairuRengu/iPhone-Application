var assert = require('chai').assert
var fs = require('fs')
var path = require('path')
var ImageUploader = require('../lib/ImageUploader')

/**
 * This is an integration test for the Imgur uploader. It allows testing to make
 * sure the API does not suddenly break.
 */
describe('ImageUploader', function() {
  describe('#uploadImageFromDisk', function() {
      var uploader = new ImageUploader()
      it('should upload an image to the disk when possible / imgur is up', function(done) {
        uploader.uploadImageFromDisk(path.join(__dirname, '/res/homura.jpg'), function(url) {
          assert.isNotNull(url)
          done()
        })
      })

      it('should return null when image not on disk', function(done) {
        uploader.uploadImageFromDisk(path.join(__dirname, '/res/404.jpgx'), function(url) {
          assert.isNull(url)
          done()
        })
      })
  })
})
