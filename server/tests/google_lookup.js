var assert = require('chai').assert
var GoogleLookupStrategy = require('../lib/GoogleLookupStrategy')

describe('GoogleLookupStrategy', () => {

  describe('#queueUrl', () => {
    it('should increase queue size', (done) => {
        var lookup = new GoogleLookupStrategy()
        var queueSize = lookup.getQueueSize()
        lookup.queueUrl('http://cdn.myanimelist.net/images/characters/6/219771.jpg')
        assert(lookup.getQueueSize() == queueSize + 1)
        done()
    })
  })

  describe('#fetchProductInformationFromQueue', (done) => {
    it('should throw an exception if the queue is empty', (done) => {
      var lookup = new GoogleLookupStrategy()
      var isStarted = lookup.fetchProductInformationFromQueue()
      assert.isFalse(isStarted)
      done()
    })

    it('should begin and upload if queue is non-empty', function(done) {
      this.timeout(30000)
      var lookup = new GoogleLookupStrategy()
      lookup.queueUrl('http://cdn3-www.playstationlifestyle.net/assets/uploads/2015/04/disgaea-5-ps4-box-art.jpg')
      var isStarted = lookup.fetchProductInformationFromQueue((guess) => {
        // Assert the sanity of the data
        assert(guess.trim() === 'ps4 disgaea 5')
        done()
      })
      assert.isTrue(isStarted)
    })
  })
})
