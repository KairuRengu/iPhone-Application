//
//  ProductSearchService.swift
//  iPhone Application
//
//  Created by Vaughan Hilts on 2016-03-31.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation
import UIKit

class ProductSearchService {

    // We don't really need to init anything right now
    init() {
        
    }
    
    /**
     Fetches product by image
    */
    func getProductByImage(image : UIImage, completeCallback : (Product?) -> Void) {
        let serviceUrl = ServiceConfiguration.getApiEndPoint() + "search"
        HTTPUtility.POSTWithImage(image, url: serviceUrl) {
            json in
            if(json != nil) {
                let product = Product(json: json!)
                completeCallback(product)
            } else {
                completeCallback(nil)
            }
        }
        
    }
    
}