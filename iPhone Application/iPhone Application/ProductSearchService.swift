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
    
    /**
     Fetches the product price, based on the product itself.
    */
    func getProductPrice(product : Product, completeCallback : (Int?) -> Void) {
        let serviceUrl = ServiceConfiguration.getApiEndPoint() + "search/price"
        let params = [
            "title": product.getTitle()
        ]
        HTTPUtility.POSTWithParameters(serviceUrl, params: params) {
            json in
            if(json != nil) {
                let price = json!["median"] as! Int
                completeCallback(price)
            }
            else {
                completeCallback(nil)
            }
        }
    }
    
    /**
     Fetches the product price, based on the product itself.
     */
    func postAdvertisement(ad : AdPost, completeCallback : (Bool) -> Void) {
        let serviceUrl = ServiceConfiguration.getApiEndPoint() + "advertisement"
        let mapper = EbayProductTypeToCategoryMapper()
        
        let params = [
            "title": ad.getTitle(),
            "description": ad.getDescription(),
            "categoryId": mapper.getCategoryIdForProductType(ad.getCategory()),
            "price": ad.getPrice().description
        ]
        
        // TODO: Attach the photos
        
        HTTPUtility.POSTWithParameters(serviceUrl, params: params) {
            json in
            if(json != nil) {
                completeCallback(true)
            }
            else {
                completeCallback(false)
            }
        }
    }
    
    
}