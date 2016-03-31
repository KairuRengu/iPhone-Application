// Vaughan Hilts - March 2016

import Foundation

/**
 Provides attachments for a product. These are usually additional, high resolution images of the original.
*/
class ProductAttachment {
    private var type : String
    private var value : String
    
    init(type : String, value : String) {
        self.type = type
        self.value = value
    }
    
    func getType() -> String {
        return type
    }

    func getValue() -> String {
        return self.value
    }
}