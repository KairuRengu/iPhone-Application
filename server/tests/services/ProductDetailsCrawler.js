var assert = require('chai').assert
var ProductDetailsCrawler = require('../../services/product_crawler/ProductDetailsCrawler')

// Just some basic mocks
var MockScannerExample = {
  canAcceptLink: function(url) {
      return url === '1'
  },

  getFriendlyName: function() {
    return 'Mock Scanner Example'
  },

  getTypeOfProduct: function() {
    return null
  },

  scanLink: function(url, callback) {
    callback( {
      title: 'Example'
    })
  }
}

var MockScannerExample2 = {
  canAcceptLink: function(url) {
      return url === '2'
  },

  getFriendlyName: function() {
    return 'Mock Scanner Example 2'
  },

  getTypeOfProduct: function() {
    return null
  },

  scanLink: function(url, callback) {
    callback( {
      title: 'You Should Never See This',
      description: 'Meep',
      productType: 2
    })
  }
}


// Please keep these tests up to date, they're important.
// This crawler logic is vital to how everything operates.
describe('ProductDetailsCrawler', () => {
    describe('#getProductDetailsForUrls', () => {
      var crawler = new ProductDetailsCrawler()
      crawler.addDetailScanner(MockScannerExample)
      crawler.addDetailScanner(MockScannerExample2)

      it('should return a blank metadata object when no scanners are available', (done) => {
        var blankCrawler = new ProductDetailsCrawler()
          blankCrawler.getProductDetailsForUrls(['1', '2'], (data) => {
            if(!data.isComplete()) {
              assert(data.title !=== 'You Should Never See This')
              done()
            } else {
              assert.fail('somehow got back a completed data object!?')
            }
          })
      })

      it('should return a blank meta-data (incomplete) when no URLs are passed in', (done) => {
          crawler.getProductDetailsForUrls([], (data)  => {
            if(!data.isComplete()) {
              done()
            } else {
            assert.fail('somehow got a completed data object')
            }
          })
      })

      it('should not overwrite data from previous scanners',  (done) => {
        // There is a requirement that if two scanners find the same data point
        // then only one of them should be saved, but it should be the first one
        // that found it. The idea is URLs should be sorted in order of their relevance.
        // We risk taking less relevant information if we just accept the last  one
        crawler.getProductDetailsForUrls(['1', '2'], (data) => {
          assert(data.title === 'Example');
          done()
        })
      })

      it('should not call a scanner on a link it does not support', (done) => {
        crawler.getProductDetailsForUrls(['xxx', 'yyyy'], (data) => {
          assert(data.title === undefined)
          done()
        })
      })
    })
})
