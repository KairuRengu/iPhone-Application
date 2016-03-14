var assert = require('chai').assert
var fs = require('fs')
var path = require('path')
var Product = require('../model/Product')
var ProductType = require('../model/ProductType')
var PriceGeekProductPricer = require('../lib/PriceGeekProductPricer')

describe('PriceGeekProductPricer', function() {
  describe('#getPricingInformationForProduct', function () {
    it('should return a price snapshot when a price is available', function (done) {
      var product = new Product('Final Fantasy X PS4', ProductType.Game)
      var pricer = new PriceGeekProductPricer(fs.readFileSync(path.join(__dirname, '/res/geek_ffx.html')).toString())
      pricer.getPricingInformationForProduct(product, function(price) {
          assert.isNotNull(price);
          assert.isNumber(price.median);
          assert(price.median == 14.35);
          done();
      })
    });

    it('should return null when no price is available', function(done) {
      var product = new Product('Some fgfgfg item', ProductType.Electronics)
      var pricer = new PriceGeekProductPricer(fs.readFileSync(path.join(__dirname, '/res/geek_404.html')).toString())
      pricer.getPricingInformationForProduct(product, function(price) {
          assert(price == null)
          done();
      })
    });

    it('should throw an exception when a bad product is passed in', function(done) {
      var pricer = new PriceGeekProductPricer()
      done();
    })

  });
});
