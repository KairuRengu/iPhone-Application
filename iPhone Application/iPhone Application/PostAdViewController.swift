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
    
    var categories = ["Book", "Video Game", "DVD", "Music", "Misc"]
    
    var pageImages: [UIImage] = []
    var pageViews: [UIImageView?] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Wire delegate to be yourself
//        self.scrollView.delegate = self
//        
//        pageImages = [UIImage(named: "photo1.png")!,
//            UIImage(named: "photo2.png")!,
//            UIImage(named: "photo3.png")!,
//            UIImage(named: "photo4.png")!,
//            UIImage(named: "photo5.png")!]
//        
//        let pageCount = pageImages.count
//        
//        pageControl.currentPage = 0
//        pageControl.numberOfPages = pageCount
//        
//
//        for _ in 0..<pageCount {
//            pageViews.append(nil)
//        }
//        

//        let pagesScrollViewSize = scrollView.frame.size
//        scrollView.contentSize = CGSize(width: pagesScrollViewSize.width * CGFloat(pageImages.count),
//            height: pagesScrollViewSize.height)
//        
        // 5
     //   loadVisiblePages()
        
        // TODO: Implement this back at some point, some point in the future, though
//        self.pickerCategory.delegate = self
//        self.pickerCategory.dataSource = self
    }
    
    func loadPage(page: Int) {
        if page < 0 || page >= pageImages.count {
            // If it's outside the range of what you have to display, then do nothing
            return
        }
        
        // 1
        if let pageView = pageViews[page] {
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
    
}