/**
 * A product link scanner is responsible for returning some product details
 * that it can find, based on the fields it can scrape from a given URL.
 */
class ProductLinkScanner {
    constructor() {

    }

    /**
     * Given a string URL, returns whether or not this link scanner can
     * accept it.
     * @param  {String} url The URL to scan
     * @return {Bool}     Returns true if the scanner can validate this link
     * and attempt to return information from it. Otherwise, returns false.
     */
    canAcceptLink(url) {
        return true
    }

    scanLink(url) {
        throw Error('requires a superclass to scan links; must implement')
    }
    
}

module.exports = ProductLinkScanner
