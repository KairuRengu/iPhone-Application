'use strict'

/**
 * A product link scanner is responsible for returning some product details
 * that it can find, based on the fields it can from a given URL.
 *
 * The scanner itself does not define a contract on how the data is retrieved.
 * For some URLs, APIs may be available and for others, scraping may be the best
 * way forward.
 */
class ProductLinkScanner {
    /**
     * Given a string URL, returns whether or not this link scanner can
     * accept it.
     * @param  {String} url The URL to scan
     * @return {Bool}     Returns true if the scanner can validate this link
     * and attempt to return information from it. Otherwise, returns false.
     */
    canAcceptLink(url) {
      throw Error('This method must be over-ridden! It is part of the contact.')
    }

    getFriendlyName() {
      throw Error('This method must be over-ridden! It is part of the contact.')
    }

    getTypeOfProduct() {
      throw Error('This method must be over-ridden! It is part of the contact.')
    }

    /**
     * Returns a ProductMetadata object that was extracted from this
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    scanLink(url, callback) {
      throw Error('This method must be over-ridden! It is part of the contact.')
    }

}

module.exports = ProductLinkScanner
