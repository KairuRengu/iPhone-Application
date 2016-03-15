var assert = require('chai').assert
var request = require('request')
var HachetteBookGroupScraperParser = require('../scrapers/HachetteBookGroupScraperParser')
var ProductType = require('../model/ProductType')

describe('Web Scraping Services (Integration Test)', () => {
  describe('Hatchette Book Group', () => {
    var parser = new HachetteBookGroupScraperParser()
    it('should return sane values', (done) => {
      var url = 'http://www.hachettebookgroup.com/titles/isuna-hasekura/spice-and-wolf-vol-11/9780316324274/'
      request(url, (error, response, body) => {
        var data = parser.getProductMetadataDetails(body)
        assert(data.attachments.length === 1)
        assert(data.attachments[0].type === 'image')
        assert(data.title === 'Spice and Wolf, Vol. 11')
        assert(data.productType = ProductType.Book)
        done()
      })
    })
  })
})
