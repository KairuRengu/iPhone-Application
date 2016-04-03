//
//  ServiceConfiguration.swift
//  iPhone Application
//
//  Created by Vaughan Hilts on 2016-03-31.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation

/*
    Provides some service configuration state data for the APIs in Swift.
*/
class ServiceConfiguration {
 
    /**
     Returns the API endpoint for the server, wherever it may be.
    */
    static func getApiEndPoint() -> String {
        return "http://159.203.11.151:2740/";
    }
    
}