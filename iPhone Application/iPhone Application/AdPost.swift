// Vaughan Hilts - March 2016

import Foundation
import UIKit

/**
 Represents a single AdPost. Only used as a dumb DTO.
*/
class AdPost {
    
    private var title : String = "";
    private var description : String = ""
    private var productCategory : ProductType
    // cost for the item requested
    private var price : Float
    private var images : [UIImage] = []
    
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
    
    func getImages() -> [UIImage] {
        return self.images
    }
    
    func addImage(image : UIImage) {
        self.images.append(image)
    }
    
    
}