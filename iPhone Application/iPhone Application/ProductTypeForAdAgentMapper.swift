// Vaughan Hilts - March 2016

import Foundation

/**
 This protocol has the sole responsibility of mapping the ProductType internally to the various categories available on eBay, Kijiji, etc.
 There will be one per agent implementation.
*/
protocol ProductTypeForAdAgentMapper {
    func getCategoryIdForProductType(productType : ProductType) -> String
}