//
//  UIImagePicker.swift
//  iPhone Application
//
//  Created by Kyle on 2016-03-14.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import UIKit

class UIImagePicker: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate  {

    
    @IBOutlet var imageView: UIImageView!
    @IBOutlet var chooseBuuton: UIButton!
    var imagePicker = UIImagePickerController()
    
    @IBAction func btnClicked(){
        
        if UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.SavedPhotosAlbum){
            print("Button capture")
            
            
            imagePicker.delegate = self
            imagePicker.sourceType = UIImagePickerControllerSourceType.SavedPhotosAlbum;
            imagePicker.allowsEditing = false
            
            self.presentViewController(imagePicker, animated: true, completion: nil)
        }
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    
    
    func imagePickerController(picker: UIImagePickerController!, didFinishPickingImage image: UIImage!, editingInfo: NSDictionary!){
        self.dismissViewControllerAnimated(true, completion: { () -> Void in
            
        })
        
        // TODO: Remove this call, we just want to remove this period
        //        imageView.image = image

        SwiftSpinner.show("Analyzing image...")
        let service : ProductSearchService = ProductSearchService()
        service.getProductByImage(image) {
            product in
            print("Product coming back... I hope")
            SwiftSpinner.hide() {
                // You can now perform the segue into another view from here
                // TODO: Figure out how to do that
            }
        }

    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
