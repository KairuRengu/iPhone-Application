//
//  PostAdViewController.swift
//  iPhone Application
//
//  Created by Vaughan Hilts on 2016-03-29.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation
import UIKit

class PostAdViewController: UIViewController, UIPickerViewDelegate, UIPickerViewDataSource, UIScrollViewDelegate, UIActionSheetDelegate {

    @IBOutlet weak var CategoryLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
     @IBOutlet var TextFieldText: [UITextField] = []
    @IBOutlet weak var TextView: UITextView!
    
    @IBOutlet weak var textPrice: UITextField!
    @IBOutlet weak var textTitle: UITextField!
    @IBOutlet weak var textDescription: UITextView!
    
    
    var categories = ["Book", "Video Game", "DVD", "Music", "Misc"]
    var category : ProductType?
    
    var pageImages: [UIImage] = []
    var pageViews: [UIImageView?] = []
    
    // Posting stuff
    var postingProduct : Product?
    var currentImage : UIImage?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: "dismissKeyboard")
        view.addGestureRecognizer(tap)
        
        // If there's a product, load it
        if((postingProduct) != nil) {
                fetchPricingAndPopulate()
        }
    }
    

    func fetchPricingAndPopulate() {
        // Fill in the fields accordingly to this
        textTitle.text = postingProduct?.getTitle()        
        textDescription.text = postingProduct?.getDescription()
        category = postingProduct?.getProductType()
        updateCategory()
        updateImageView()
        
        
        
        let service = ProductSearchService()
        service.getProductPrice(postingProduct!) {
            price in
            // TODO: Wire this up to somewhere
            dispatch_async(dispatch_get_main_queue()) {
                self.textPrice.text = price?.description
            }
        }
    }
    
    func updateImageView() {
        self.imageView.image = self.currentImage
    }
    
    func updateCategory() {
        if(category != nil) {
            let x = category!
            var label = ""
            
            if(x == ProductType.Book) {
                label = "Book"
            } else if(x == ProductType.Game) {
                label = "Game"
            } else if(x == ProductType.Movie) {
                label = "Movie"
            } else if(x == ProductType.Music) {
                label = "Music"
            }
            
            
            self.CategoryLabel.text = label
        }
    }
    
    
    // MARK: Scrolling delegate work
    func scrollViewDidScroll(scrollView: UIScrollView) {
        if scrollView.contentOffset.x>0 {
            scrollView.contentOffset.x = 0
        }
    }
    
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)   
    }
    
    // MARK: Category Providers
    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 1
    }
    

    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return categories.count
    }
    
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return categories[row]
    }

    @IBAction func TextFieldDoneEditing(sender: UITextField){
        //sends the keyboard away when the user is done editing/
        sender.resignFirstResponder()
        
        //error handling for the price
        let numberFormatter = NSNumberFormatter()
        numberFormatter.numberStyle = NSNumberFormatterStyle.DecimalStyle
        
        if let price = numberFormatter.numberFromString(TextFieldText[1].text! as String){
            
            if (price.compare(NSNumber(double : 0.00)) == .OrderedAscending) {
                let errorMenu = UIAlertController(title: nil, message: "Please enter a price greater than $0.00", preferredStyle: .ActionSheet)
                //present the Action sheet controller to the user
                //Cancel the action and do nothing
                let cancelAction = UIAlertAction(title: "Cancel", style: .Cancel, handler: {
                    (alert: UIAlertAction!) -> Void in})
                errorMenu.addAction(cancelAction)
                self.presentViewController(errorMenu, animated: true, completion: nil)
            }
            
        }else{
            
            let errorMenu = UIAlertController(title: nil, message: "Your entry contains invalid characters", preferredStyle: .ActionSheet)
            //present the Action sheet controller to the user
            //Cancel the action and do nothing
            let cancelAction = UIAlertAction(title: "Cancel", style: .Cancel, handler: {
                (alert: UIAlertAction!) -> Void in})
            errorMenu.addAction(cancelAction)
            self.presentViewController(errorMenu, animated: true, completion: nil)
        }
        sender.resignFirstResponder()
    }
    @IBAction func BackgroundTap(sender: UIControl){
        //stops all keyboards for any text field.
        TextFieldText[0].resignFirstResponder()
        TextFieldText[1].resignFirstResponder()
        TextFieldText[2].resignFirstResponder()
    }
    //Calls this function when the tap is recognized.
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    

    
    //add category function to allow the user to add a category to the ad
    @IBAction func AddCategory(sender: AnyObject) {
        //define the option menu
        let optionMenu = UIAlertController(title: nil, message: "Choose Option", preferredStyle: .ActionSheet)
        
        // Declare what the user can select as a category
        let AddBookCategory = UIAlertAction(title: "Book", style: .Default, handler: {
            (alert: UIAlertAction!) -> Void in
            self.category = ProductType.Book
            self.updateCategory()
        })
        let AddMovieCategory = UIAlertAction(title: "Movie", style: .Default, handler: {
            (alert: UIAlertAction!) -> Void in
            self.category = ProductType.Movie
            self.updateCategory()
        })
        
        let AddMusicCategory = UIAlertAction(title: "Music", style: .Default, handler: {
            (alert: UIAlertAction!) -> Void in
            self.category = ProductType.Music
            self.updateCategory()
        })
        let AddGameCategory = UIAlertAction(title: "Game", style: .Default, handler: {
            (alert: UIAlertAction!) -> Void in
                self.category = ProductType.Game
                self.updateCategory()
            }
        )
        
        //Cancel the action and do nothing
        let cancelAction = UIAlertAction(title: "Cancel", style: .Cancel, handler: {
            (alert: UIAlertAction!) -> Void in})
        
        
        // Add the options to the Action Sheet
        optionMenu.addAction(AddBookCategory)
        optionMenu.addAction(AddMovieCategory)
        optionMenu.addAction(AddMusicCategory)
        optionMenu.addAction(AddGameCategory)
        optionMenu.addAction(cancelAction)
        
        //present the Action sheet controller to the user
        self.presentViewController(optionMenu, animated: true, completion: nil)
    }
    
    @IBAction func ValidatePost(sender: AnyObject) {

        
        
        let errorMenu = UIAlertController(title: nil, message: "Invalid Advertisement", preferredStyle: .ActionSheet)
        if(TextFieldText[0].text!.isEmpty == true){
            let cancelAction = UIAlertAction(title: "Your advertisement does not have a title!", style: .Default, handler: {
                (alert: UIAlertAction!) -> Void in})
                errorMenu.addAction(cancelAction)
                self.presentViewController(errorMenu, animated: true, completion: nil)
        }else if (TextFieldText[1].text!.isEmpty == true){
            let cancelAction = UIAlertAction(title: "Your advertisement is missing a description!", style: .Default, handler: {
                (alert: UIAlertAction!) -> Void in})
            errorMenu.addAction(cancelAction)
            self.presentViewController(errorMenu, animated: true, completion: nil)
        }else if (self.CategoryLabel.text?.isEmpty == true){
            let cancelAction = UIAlertAction(title: "Your product needs to have a category!", style: .Default, handler: {
                (alert: UIAlertAction!) -> Void in})
            errorMenu.addAction(cancelAction)
            self.presentViewController(errorMenu, animated: true, completion: nil)
        } else {
            // OK, we're good. Try and post it :D
            SwiftSpinner.show("Posting ad...")
            let numberFormatter = NSNumberFormatter()
            numberFormatter.numberStyle = NSNumberFormatterStyle.DecimalStyle
            
            let service = ProductSearchService()
            let post = AdPost(title: textTitle.text!, description: textDescription.text!, productCategory: category!, price: Float(textPrice.text!)!)
            post.addImage(self.currentImage!)
            service.postAdvertisement(post) {
                success in
                    if(success) {
                        SwiftSpinner.hide() {
                            self.performSegueWithIdentifier("finish", sender: post)
                        }
                    } else {
                            SwiftSpinner.hide()
                            // Prompt user about an error
                        let alert = UIAlertController(title: "Information", message: "The server could not post your ad right now.", preferredStyle: UIAlertControllerStyle.Alert)
                        alert.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.Default, handler: nil))
                        self.presentViewController(alert, animated: true, completion: nil)
                    }
                }
            
            
            }
        }
        
        
        
    }
    
