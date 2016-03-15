var assert = require('chai').assert
var MetadataAttachment = require('../../model/MetadataAttachment')

describe('MetadataAttachment', () => {
  describe('#constructor', () => {
    it('should identify images correctly', (done) => {
      var attachment = new MetadataAttachment('https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/120px-HTML5_logo_and_wordmark.svg.png')
      assert(attachment.type === 'image')
      done()
    })

    it('should identify videos correctly', (done) => {
      var attachment = new MetadataAttachment('http://hopper.wlu.ca/~hilt2740/video.mp4')
      assert(attachment.type === 'video')
      done()
    })

    it('should identify youtube correctly', (done) => {
      var attachment = new MetadataAttachment('https://www.youtube.com/watch?v=sRicwVSTPEc')
      assert(attachment.type === 'youtube')
      done()
    })

    it('should identify normal pages as unknown', (done) => {
      var attachment = new MetadataAttachment('http://www.hachettebookgroup.com/titles/isuna-hasekura/spice-and-wolf-vol-15/9780316339612/')
      assert(attachment.type === 'unknown')
      done()
    })

  })
})
