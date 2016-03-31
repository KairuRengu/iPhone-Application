//
//  CreateProductAd.swift
//  iPhone Application
//
//  Created by Kyle on 2016-03-31.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import UIKit

class CreateProductAd: UIViewController {
    
    @IBOutlet weak var PriceTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func PriceCheck(sender: UITextField) {
        let Price = PriceTextField.text
        
        
        
    }
}
