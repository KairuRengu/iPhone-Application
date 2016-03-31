// Vaughan Hilts - 2016

import Foundation
import UIKit

class ResourcePickerViewController : UIViewController, UIScrollViewDelegate  {
    
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var pageControl: UIPageControl!    
    
    // These images are all resources available to us
    var pageImages: [UIImage] = []
    var pageViews: [UIImageView?] = []
    var attachments : [ProductAttachment] = []
    
    override func viewDidAppear(animated: Bool) {
        
    }
    
    override func viewDidLoad() {
        self.preloadImages()
    }
    
    private func preloadImages() {
        for attachment in attachments {
            let value = attachment.getValue()
            HTTPUtility.getImageFromUrl(value) {
                image in
                self.pageImages.append(image)
            }
        }
    }
    
    private func checkCompletion() {
        if self.pageImages.count == self.attachments.count {

            let pageCount = pageImages.count
            pageControl.currentPage = 0
            pageControl.numberOfPages = pageCount
            for _ in 0..<pageCount {
                pageViews.append(nil)
            }
            
            let pagesScrollViewSize = scrollView.frame.size
            scrollView.contentSize = CGSize(width: pagesScrollViewSize.width * CGFloat(pageImages.count),
                height: pagesScrollViewSize.height)
            
            loadVisiblePages()            
        }
    }
    
    
    // MARK: Scrollview stuff
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
    }
    
    
}