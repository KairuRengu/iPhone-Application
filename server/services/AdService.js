'use strict'
var ebay = require('ebay-api');
var uuid = require('node-uuid');



/**
 * Provides advertisements services for the business logic of the application
 * to be able to invoke and post advertisements.
 */
class AdService {
    constructor()  {

    }

    /**
     * Posts an advertisement to eBay using the Node.js API provided
     * @return {[type]} [description]
     */
    ebay(ad, callback) {
      // eBay requires we have a unique URL
      var uniqueId = uuid.v4().toString().replace(/-/g, '')

      var title = ad.title
      var description = ad.description
      var price = ad.price
      var category = ad.category
      var image = ad.image

      image = image || ""

      ebay.xmlRequest({
        serviceName : 'Trading',
        opType : 'AddItem',

        // app/environment
        devId: '06726ef5-7881-4fea-ac47-86c435c58e00',
        certId: 'SBX-38ccaf50fc99-9134-4886-90b6-64d0',
        appName: 'KyleLeng-iPhoneeB-SBX-c38ccaf50-4cc947b1',
        sandbox: true,

        // per user
        authToken: 'AgAAAA**AQAAAA**aAAAAA**oj4AVw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4GgCJCApASdj6x9nY+seQ**nL0DAA**AAMAAA**g5JVBQV9IRXyjfK+DyYfNmCw2DG/W4hC2Ck4RGHea6FM3+NSAXUk+QmT1iC5IpSviz5Q1eW9N91DJNZ/ha/ov0bvNJSyjm2EZV9Ch40FF74Ayxwu1Pf6ZN516P5zZhlkYR0iLxHAdo67HwaGC5lk4DpcW7liTzUMzdtgDnfM0nwSaySqeo1BEJ2q+0iE+I9aM4HjPQirr2aQigeI8Z4km6yg/wgabpatH+nKUoJUqglNuxD2nJqkK4KbBpSwZQN8+j4q9xt1yznF2jprlVJPJAhJ9YBB8AFZNwGYqxfpREBfQPjmSQo9vEVqoBFbaOlelCl/gIgpLie+x9izxJilFJuvECMIW5DXc+HARI0xXnkKS/NL+R74/CKEO+UHkXb31BcdpopNB10Qou5BpFdfQLAw7mKhQ1RLKDk494nQ0pN40K/jupRhSTIjcuvK9ShggKaEvKix32FtqEZLBUW3fCwJSgEvYg/ACAltavWx/m1dEINSidBejFogGl9EqwWIGRtkv4yBTijpKGmCbSEACb0wC2IOTq8Ox8lVOpCxJgRK8Q/xZggKHANzA3V3BRAgJv84kOgtSU61+xPrkdl4K7LZjm9jWolKnJurILV8YV22bdUV12DUonY7XJZuylH4rr1WecvgWoo1fjb3qzQ5uuzdni/xq1b1d02/gs+890aDUOQqcd4vcS1LFo0oGu/sxuyeQPM+VA38Izo3v0B0dvQVaiB9x90gaNMIF6qksk3M+ySfpf1WtqA1EXpgtzVM',

        params: {
                  "ErrorLanguage": "en_US",
                  "WarningLevel": ["High", "High"],
                  "Item": {
                      "Title": title,
                      "Description": description,
                      "PrimaryCategory": {
                          "CategoryID": category
                      },
                      "StartPrice": price.toString(),
                      "ConditionID": "4000",
                      "CategoryMappingAllowed": "true",
                      "Country": "US",
                      "Currency": "CAD",
                      "DispatchTimeMax": "3",
                      "ListingDuration": "Days_7",
                      "ListingType": "Chinese",
                      "PaymentMethods": "PayPal",
                      "PayPalEmailAddress": "magicalbookseller@yahoo.com",
                      "PictureDetails": {
                          "PictureURL": image.toString()
                      },
                      "PostalCode": "95125",
                      "Quantity": "1",
                      "ReturnPolicy": {
                          "ReturnsAcceptedOption": "ReturnsAccepted",
                          "RefundOption": "MoneyBack",
                          "ReturnsWithinOption": "Days_30",
                          "Description": description,
                          "ShippingCostPaidByOption": "Buyer"
                      },
                      "ShippingDetails": {
                          "ShippingType": "Flat",
                          "ShippingServiceOptions": {
                              "ShippingServicePriority": "1",
                              "ShippingService": "USPSMedia",
                              "ShippingServiceCost": "\n2.50\n"
                          }
                      },
                      "Site": "US",
                      "UUID": uniqueId
                  },
                  "RequesterCredentials": {
                      "eBayAuthToken": "AgAAAA**AQAAAA**aAAAAA**oj4AVw**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wFk4GgCJCApASdj6x9nY+seQ**nL0DAA**AAMAAA**g5JVBQV9IRXyjfK+DyYfNmCw2DG/W4hC2Ck4RGHea6FM3+NSAXUk+QmT1iC5IpSviz5Q1eW9N91DJNZ/ha/ov0bvNJSyjm2EZV9Ch40FF74Ayxwu1Pf6ZN516P5zZhlkYR0iLxHAdo67HwaGC5lk4DpcW7liTzUMzdtgDnfM0nwSaySqeo1BEJ2q+0iE+I9aM4HjPQirr2aQigeI8Z4km6yg/wgabpatH+nKUoJUqglNuxD2nJqkK4KbBpSwZQN8+j4q9xt1yznF2jprlVJPJAhJ9YBB8AFZNwGYqxfpREBfQPjmSQo9vEVqoBFbaOlelCl/gIgpLie+x9izxJilFJuvECMIW5DXc+HARI0xXnkKS/NL+R74/CKEO+UHkXb31BcdpopNB10Qou5BpFdfQLAw7mKhQ1RLKDk494nQ0pN40K/jupRhSTIjcuvK9ShggKaEvKix32FtqEZLBUW3fCwJSgEvYg/ACAltavWx/m1dEINSidBejFogGl9EqwWIGRtkv4yBTijpKGmCbSEACb0wC2IOTq8Ox8lVOpCxJgRK8Q/xZggKHANzA3V3BRAgJv84kOgtSU61+xPrkdl4K7LZjm9jWolKnJurILV8YV22bdUV12DUonY7XJZuylH4rr1WecvgWoo1fjb3qzQ5uuzdni/xq1b1d02/gs+890aDUOQqcd4vcS1LFo0oGu/sxuyeQPM+VA38Izo3v0B0dvQVaiB9x90gaNMIF6qksk3M+ySfpf1WtqA1EXpgtzVM"
                  }
        }
      }, function(error, results) {
          if(error) {
            console.log(error)
            callback(false)
          } else {
            callback(true)
          }
      });

    }

}

module.exports = AdService
