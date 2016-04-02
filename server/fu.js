var ebay = require('ebay-api');
var uuid = require('node-uuid');

// The unique ID
var uniqueId = uuid.v4().toString().replace(/-/g, '')
console.log(uniqueId)

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
                "Title": "Sins of the Eden",
                "Description": "Forem du asum it ich! Greetings from Node.js",
                "PrimaryCategory": {
                    "CategoryID": "377"
                },
                "StartPrice": "1.00",
                "ConditionID": "3000",
                "CategoryMappingAllowed": "true",
                "Country": "US",
                "Currency": "USD",
                "DispatchTimeMax": "3",
                "ListingDuration": "Days_7",
                "ListingType": "Chinese",
                "PaymentMethods": "PayPal",
                "PayPalEmailAddress": "magicalbookseller@yahoo.com",
                "PictureDetails": {
                    "PictureURL": "http://i1.sandbox.ebayimg.com/03/i/00/6b/63/03_1.JPG?set_id=8800005007"
                },
                "PostalCode": "95125",
                "Quantity": "1",
                "ReturnPolicy": {
                    "ReturnsAcceptedOption": "ReturnsAccepted",
                    "RefundOption": "MoneyBack",
                    "ReturnsWithinOption": "Days_30",
                    "Description": "\n            This is the first book in the Harry Potter series. In excellent condition!\n          ",
                    "ShippingCostPaidByOption": "Buyer"
                },
                "ShippingDetails": {
                    "ShippingType": "Flat",
                    "ShippingServiceOptions": {
                        "ShippingServicePriority": "1",
                        "ShippingService": "USPSMedia",
                        "ShippingServiceCost": "\n              2.50\n            "
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
    console.log(error)
    console.log(results)
});
