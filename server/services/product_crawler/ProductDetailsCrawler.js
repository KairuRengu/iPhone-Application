/**
 * Given a set of related URLs and some target metadata to find, will attempt
 * to find any related information that is possible on the product given the
 * assosciated meta-data.
 */
class ProductDetailsCrawler {

  constructor(scanners) {
    // The scanners to be used by this product crawler
    this._scanners = scanners || []
  }

  getProductDetailsForUrls(urls) {
    urls.forEach((url) => {
      this._getProductDetailFromUrl(url)
    })
  }

  /**
   * Adds a detail scanner to the crawler for usage.
   * @param {[DetailScanner]} scanner The scanner to add the details crawler
   */
  addDetailScanner(scanner) {
    this._scanners.push(scanner)
  }


  _getProductDetailFromUrl() {
      this._scanners.forEach((scanner) => {
        
      })
  }


}

module.exports = ProducDetailstCrawler
