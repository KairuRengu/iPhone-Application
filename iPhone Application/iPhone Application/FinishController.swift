//
//  FinishController.swift
//  SnappyAd
//
//  Created by Vaughan Hilts on 2016-04-03.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation
import UIKit

class FinishController: UIViewController {
    
    @IBAction func clickedHome(sender: AnyObject) {
        // Pop the root and go home
        self.navigationController?.popToRootViewControllerAnimated(true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}

