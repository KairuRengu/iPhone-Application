//
//  PostAdViewController.swift
//  iPhone Application
//
//  Created by Vaughan Hilts on 2016-03-29.
//  Copyright © 2016 kyle_leng. All rights reserved.
//

import Foundation
import UIKit

class PostAdViewController: UIViewController, UIPickerViewDelegate, UIPickerViewDataSource, UIScrollViewDelegate {

    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var pageControl: UIPageControl!
    
    
    @IBOutlet weak var imageView: UIImageView!
     @IBOutlet var TextFieldText: [UITextField] = []
    @IBOutlet weak var TextView: UITextView!
    
    @IBOutlet weak var textPrice: UITextField!
    @IBOutlet weak var textTitle: UITextField!
    @IBOutlet weak var textDescription: UITextView!
    
    
    var categories = ["Book", "Video Game", "DVD", "Music", "Misc"]
    
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
    
    /**
     This function may return nil if it can't figure out or
     fails to validate the content.
    */
    private func getAdPostFromPageModel() -> AdPost? {
        return nil
    }
    
    func loadPage(page: Int) {
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // 1
        if let _ = pageViews[page] {
            // Do nothing. The view is already loaded.
        } else {
            // 2
            var frame = scrollView.bounds
            frame.origin.x = frame.size.width * CGFloat(page)
            frame.origin.y = 0.0
            
            // 3
            let newPageView = UIImageView(image: pageImages[page])
            newPageView.contentMode = .ScaleAspectFit
            newPageView.frame = frame
            scrollView.addSubview(newPageView)
            
            // 4
            pageViews[page] = newPageView
        }
    }

    func purgePage(page: Int) {
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // Remove a page from the scroll view and reset the container array
        if let pageView = pageViews[page] {
            pageView.removeFromSuperview()
            pageViews[page] = nil
        }
    }
    
    func loadVisiblePages() {
        // First, determine which page is currently visible
        let pageWidth = scrollView.frame.size.width
        let page = Int(floor((scrollView.contentOffset.x * 2.0 + pageWidth) / (pageWidth * 2.0)))
        
        // Update the page control
        pageControl.currentPage = page
        
        // Work out which pages you want to load
        let firstPage = page - 1
        let lastPage = page + 1
        
        // Purge anything before the first page
        for var index = 0; index < firstPage; ++index {
            purgePage(index)
        }
        
        // Load pages in our range
        for index in firstPage...lastPage {
            loadPage(index)
        }
        
        // Purge anything after the last page
        for var index = lastPage+1; index < pageImages.count; ++index {
            purgePage(index)
        }
    }
    
    // MARK: Scrolling delegate work
    func scrollViewDidScroll(scrollView: UIScrollView) {
        // Load the pages that are now on screen
        loadVisiblePages()

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
    
}