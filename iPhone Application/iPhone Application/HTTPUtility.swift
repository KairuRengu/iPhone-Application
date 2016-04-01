//
//  HTTPUtility.swift
//  iPhone Application
//
//  Created by Vaughan Hilts on 2016-03-31.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation
import UIKit

/**
 Provides some basic HTTP utilities for dealing with POSTs in Swift without  needing an entire new library to get it done.
 Other developers: Add generic methods here as required
*/
class HTTPUtility {
    
    static func POSTWithImage(adImage : UIImage, url : String, completeCallback : (NSDictionary?) -> Void)
    {
        // TODO: Implement the network activity indiciator
        UIApplication.sharedApplication().networkActivityIndicatorVisible = true
        
        let myUrl = NSURL(string: url);
        let request = NSMutableURLRequest(URL:myUrl!);
        request.HTTPMethod = "POST";
        let param = [
            "apiKey"    : "8XudkSpsMjddj0JkMMn36"
        ]
        
        
        let boundary = generateBoundaryString()
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        let imageData = UIImageJPEGRepresentation(adImage, 1)
        if(imageData==nil)  { return; }
        request.HTTPBody = createBodyWithParameters(param, filePathKey: "image", imageDataKey: imageData!, boundary: boundary)
        
        
        
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            
            // Turn off the indiciator
            UIApplication.sharedApplication().networkActivityIndicatorVisible = false
            
            if((error) != nil) {
                completeCallback(nil)
                return
            }
            
            // Attempt to print the back data here
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("Response is back, result is: " + (responseString as! String))
            
            do {
                let json : NSDictionary = try NSJSONSerialization.JSONObjectWithData(data!, options: .AllowFragments) as! NSDictionary
                dispatch_async(dispatch_get_main_queue(), {
                    completeCallback(json)
                });
            }
            catch {
                completeCallback(nil)
            }
        }
        
        task.resume()
    }
    
    /**
     Makes a POST request returning a NSDictionary, which represents the values from the JSON.
    */
    static func POSTWithParameters(url : String, params : [String : String], completeCallback : (NSDictionary?) -> Void)
    {
        UIApplication.sharedApplication().networkActivityIndicatorVisible = true
        
        let myUrl = NSURL(string: url);
        let request = NSMutableURLRequest(URL:myUrl!);
        request.HTTPMethod = "POST";
        
        let p = params["title"]?.stringByAddingPercentEncodingWithAllowedCharacters(NSCharacterSet.URLFragmentAllowedCharacterSet())
        print(p)
        let paramString = "title=\(p)"
        
        request.HTTPBody = paramString.dataUsingEncoding(NSUTF8StringEncoding)

        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            
            // Turn off the indiciator
            UIApplication.sharedApplication().networkActivityIndicatorVisible = false
            
            if((error) != nil) {
                completeCallback(nil)
                return
            }
            
            // Attempt to print the back data here
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("Response is back, result is: " + (responseString as! String))
            
            do {
                let json : NSDictionary = try NSJSONSerialization.JSONObjectWithData(data!, options: .AllowFragments) as! NSDictionary
                dispatch_async(dispatch_get_main_queue(), {
                    completeCallback(json)
                });
            }
            catch {
                completeCallback(nil)
            }
        }
        
        task.resume()
        
    }
    
    static func POSTWithImage(images : [UIImage], params : [String : String], url : String, completeCallback : (NSDictionary?) -> Void)
    {
        // TODO: Implement the network activity indiciator
        UIApplication.sharedApplication().networkActivityIndicatorVisible = true
        
        let myUrl = NSURL(string: url);
        let request = NSMutableURLRequest(URL:myUrl!);
        request.HTTPMethod = "POST";
        let param = [
            "apiKey"    : "8XudkSpsMjddj0JkMMn36"
        ]
        
        
        let boundary = generateBoundaryString()
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

        var results = [NSData?]()
        for image in images {
            let imageData = UIImageJPEGRepresentation(image, 1)
            results.append(imageData)
        }
        
        request.HTTPBody = createBodyWithParametersAndMultipleImages(param, filePathKey: "image", imageDataKey: results, boundary: boundary)
        
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            
            // Turn off the indiciator
            UIApplication.sharedApplication().networkActivityIndicatorVisible = false
            
            if((error) != nil) {
                completeCallback(nil)
                return
            }
            
            // Attempt to print the back data here
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("Response is back, result is: " + (responseString as! String))
            
            do {
                let json : NSDictionary = try NSJSONSerialization.JSONObjectWithData(data!, options: .AllowFragments) as! NSDictionary
                dispatch_async(dispatch_get_main_queue(), {
                    completeCallback(json)
                });
            }
            catch {
                completeCallback(nil)
            }
        }
        
        task.resume()
    }
    
    
    // MARK: Resource fetching utilities
    static func getImageFromUrl(url : String, completeCallback : (UIImage) -> Void) {
        dispatch_async(dispatch_get_global_queue(QOS_CLASS_BACKGROUND, 0)) {
            let urlResource = NSURL(string: url)
            let imageData = NSData(contentsOfURL: urlResource!) //make sure your image in this url does exist, otherwise unwrap in a if let check
            let image = UIImage(data: imageData!)
            completeCallback(image!)
        }
    }
    
    
    // The below functions were inspired (but not copied from) http://roadfiresoftware.com/2015/10/how-to-parse-json-with-swift-2/
    // Swift has changed a lot, code does not work properly across all versions :(
    // Also, http://swiftdeveloperblog.com/image-upload-example/
    
    private static func createBodyWithParameters(parameters: [String: String]?, filePathKey: String?, imageDataKey: NSData?, boundary: String) -> NSData {
        let body = NSMutableData();
        if parameters != nil {
            for (key, value) in parameters! {
                body.appendString("--\(boundary)\r\n")
                body.appendString("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n")
                body.appendString("\(value)\r\n")
            }
        }
        
        if(imageDataKey != nil) {
            let filename = "ad.jpg"
            let mimetype = "image/jpg"
            body.appendString("--\(boundary)\r\n")
            body.appendString("Content-Disposition: form-data; name=\"\(filePathKey!)\"; filename=\"\(filename)\"\r\n")
            body.appendString("Content-Type: \(mimetype)\r\n\r\n")
            body.appendData(imageDataKey!)
            body.appendString("\r\n")
            body.appendString("--\(boundary)--\r\n")
        }
        
        return body
    }
    
    private static func createBodyWithParametersAndMultipleImages(parameters: [String: String]?, filePathKey: String?, imageDataKey: [NSData?], boundary: String) -> NSData {
        let body = NSMutableData();
        if parameters != nil {
            for (key, value) in parameters! {
                body.appendString("--\(boundary)\r\n")
                body.appendString("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n")
                body.appendString("\(value)\r\n")
            }
        }
        
        var counter = 0
        for image in imageDataKey {
            let filename = "ad.jpg"
            let mimetype = "image/jpg"
            body.appendString("--\(boundary)\r\n")
            body.appendString("Content-Disposition: form-data; name=\"\(filePathKey!)_\(counter)\"; filename=\"\(filename)\"\r\n")
            body.appendString("Content-Type: \(mimetype)\r\n\r\n")
            body.appendData(image!)
            body.appendString("\r\n")
            body.appendString("--\(boundary)--\r\n")
            counter++
        }
        return body
    }
    
    
    private static func generateBoundaryString() -> String {
        return "Boundary-\(NSUUID().UUIDString)"
    }
}