// Vaughan Hilts - March 2016

import Foundation

/**
 Represents a single AdPost. Only used as a dumb DTO.
*/
class AdPost {
    
    var title : String = "";
    var description : String = ""
    var productCategory : ProductType
    // cost for the item requested
    var price : Float
    
    init(title : String, description : String, productCategory : ProductType, price : Float) {
        self.title = title
        self.description = description
        self.productCategory = productCategory
        self.price = price
    }

    func getTitle() -> String {
        return title
    }

    func getDescription() -> String {
        return description
    }
    
    func getCategory() -> ProductType {
        return self.productCategory
    }
    
    func getPrice() -> Float {
        return self.price
    }
}