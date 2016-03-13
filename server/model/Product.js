'use strict'

/**
 * Represents a product and the various encapsulated information. We try not
 * to store too much information here unless it is completely required.
 */
class Product {

  constructor(name, productType) {
    this.productType = productType;
    this.name = name;
  }

  setProductPrice(productPriceSnapshot) {
    this.productPricingInfo = productPriceSnapshot;
  }
}
