//
//  extensions.swift
//  iPhone Application
//
//  Created by Vaughan Hilts on 2016-03-31.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation
extension NSMutableData {
    
    func appendString(string: String) {
        let data = string.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: true)
        appendData(data!)
    }
}