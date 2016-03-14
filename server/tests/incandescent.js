var assert = require('chai').assert
var IncandescentLookupStrategy = require('../lib/IncandescentLookupStrategy')

describe('IncandescentLookupStrategy', () => {

  describe('#queueUrl', () => {
    it('should increase queue size', (done) => {
        var lookup = new IncandescentLookupStrategy()
        var queueSize = lookup.getQueueSize()
        lookup.queueUrl('http://cdn.myanimelist.net/images/characters/6/219771.jpg')
        assert(lookup.getQueueSize() == queueSize + 1)
        done()
    })
  })

  describe('#fetchProductInformationFromQueue', (done) => {
    it('should throw an exception if the queue is empty', (done) => {
      var lookup = new IncandescentLookupStrategy()
      var isStarted = lookup.fetchProductInformationFromQueue()
      assert.isFalse(isStarted)
      done()
    })

    it('should begin and upload if queue is non-empty', function(done) {
      this.timeout(60000)
      var lookup = new IncandescentLookupStrategy()
      lookup.queueUrl('http://incandescent.xyz/wp-content/themes/twentyfifteen/logo.png', (matches) => {
        // Assert the sanity of the data
        assert(matches.length > 0)
        console.log(matches)

        done()
      })
      var isStarted = lookup.fetchProductInformationFromQueue()
      assert.isTrue(isStarted)
    })

  })

})
