// Vaughan Hilts - March 2016
import Foundation

class EbayProductTypeToCategoryMapper : ProductTypeForAdAgentMapper {
    func getCategoryIdForProductType(productType : ProductType) -> String {
        switch(productType) {
            case ProductType.Book:
                return "171228" // http://pages.ebay.com/sellerinformation/growing/categorychanges/books-all.html
            case ProductType.Music:
                return "176984" // http://pages.ebay.com/sellerinformation/growing/categorychanges/music-all.html
            case ProductType.Game:
                return "139973" //  http://pages.ebay.com/sellerinformation/growing/categorychanges/videogames-all.html
            case ProductType.Movie:
                return "617" // http://pages.ebay.com/sellerinformation/growing/categorychanges/dvd-all.html
        }
    }
}