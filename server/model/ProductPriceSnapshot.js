'use strict'
var assert = require('chai').assert

class ProductPriceSnapshot {
  constructor(average, median, standardDeviation) {
      this.average = average;
      this.median = median;
      this.standardDeviation = standardDeviation;

      // Verify
      assert.isNumber(average)
      assert.isNumber(median)
      assert.isNumber(standardDeviation)
  }
}

module.exports = ProductPriceSnapshot
