/*
  Provides an interface for products to be priced via various services. Represents
  only a very simple contract of information, that way users can decide how
  they want to display their information to the end user.
*/

'use strict';

class ProductPricer {

  constructor() {
  }

  /**
   * Gets and returns pricing information for a product
   * @param  {Product}  product [The product to fetch pricing info for]
   * @return {object}           [The pricing information]
   */
  getPricingInformationForProduct(product) {
      throw new Error('This method should be overridden!');
      var x = new Date(100);            
  }
}

module.exports = ProductPricer
