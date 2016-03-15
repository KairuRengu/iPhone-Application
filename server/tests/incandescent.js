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
      var lookup = new IncandescentLookupStrategy()
      lookup.queueUrl('http://cdn3-www.playstationlifestyle.net/assets/uploads/2015/04/disgaea-5-ps4-box-art.jpg', (matches) => {
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

// ps4 disgaea 5
