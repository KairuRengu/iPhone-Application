// Vaughan Hilts - March 2016

import Foundation

/**
    Represents an abstract product model, more than likely returned from a server application.
    Most values here are optional, but most of them will have empty strings for their values for type
    safety reasons. Optionals are clearly specified. Typically, an optional means it was not identified and
    the user is going to need to fill this in.
*/
class Product {
    
    private var title : String = ""
    private var description : String = ""
    private var productType : ProductType?
    private var attachments : [ProductAttachment] = []
    
    init(json : NSDictionary) {
        // We will attempt to extract what we can from the dictionary, if it does not exist it's nullable
        // Everything is technically optional on this model
        
        if let value = json["title"] {
            self.title = value as! String
        } else {
            // This is guarenteed by the API contract
            self.title = json["name"] as! String
        }

        if let value = json["description"] {
            self.description = value as! String
        }
        
        if let value = json["productType"] {
            let productTypeId = value as! Int
            productType = ProductType(rawValue: productTypeId)
        }
        
        if let value = json["attachments"] {
            let tempAttachments = value as! NSArray
            for attachment in tempAttachments {
                let type = attachment["type"] as! String
                let value = attachment["value"] as! String
                attachments.append(ProductAttachment(type: type, value: value))
            }
        }
    }
    
    func getTitle() -> String {
        return title
    }

    func getDescription() -> String {
        return description
    }
    
    /**
     Returns the type of product -- according to some generic, normalized mapping.
     If the product could not be identified, this may be nil. Be careful when unwrapping it
    */
    func getProductType() -> ProductType? {
        return productType;
    }
    
    /**
        These may be empty, but never null.
    */
    func getAttachments() -> [ProductAttachment] {
        return self.attachments
    }    
}