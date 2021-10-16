$('.btn-baogia a').click(function () {
    popup_viewed();
});
//popup

//function 1. Đã test ok
function popup_viewed() {
    try {
        follower.track('popup_viewed', {
            'properties': {
                'popUpName': 'Lấy báo giá',
                'popUpType': 'PopUp'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }

}
//function 2. Đã test ok
function popup_registered(email, phoneNumber) {
    try {
        follower.track('popup_registered', {
            'properties': {
                'email': '' + email + '',
                'phoneNumber': '' + phoneNumber + '',
                'popUpName': 'Lấy báo giá',
                'popUpType': 'PopUp'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }

}
//function 3. Đã test ok
function popup_failed(message) {
    try {
        follower.track('popup_failed', {
            'properties': {
                'errorMessage': '' + message + '',
                'errorType': '',
                'popUpName': 'Lấy báo giá',
                'popUpType': 'PopUp'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 4. Đã test ok
//sign_up
function sign_up_selected() {
    try {
        follower.track('sign_up_selected', {
            'properties': {
                'signupMethod': 'Đăng ký trực tiếp qua Website'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 5. Đã test ok
function sign_up_successful(email, fullName, phoneNumber, signupDate, signupSource) {
    try {
        follower.track('sign_up_successful', {
            'properties': {
                'email': '' + email + '',
                'fullName': '' + fullName + '',
                'phoneNumber': '' + phoneNumber + '',
                'signupDate': '' + signupDate + '',
                'signupMethod': 'Đăng ký trực tiếp qua Website',
                'signupSource': signupSource
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 6. Đã test ok
function signup_failed(message) {
    try {
        follower.track('signup_failed', {
            'properties': {
                'signupError': '' + message + '',
                'signupMethod': 'Đăng ký trực tiếp qua Website'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}

//function 7. Đã test ok
function login_selected() {
    try {
        follower.track('login_selected', {
            'properties': {
                'loginMethod': 'Nhập thông tin'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 8. Đã test ok
function login_successful(date) {
    try {
        follower.track('login_successful', {
            'properties': {
                'loginDate': '' + date + '',
                'loginMethod': 'Nhập thông tin'
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 9. Đã test ok
function login_failed(message) {

    try {
        follower.track('login_failed', {
            'properties': {
                'loginError': '' + message + ''
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }

}

//function 10. Đã test ok
function product_searched(query, total) {
    try {
        follower.track('product_searched', {
            'properties': {
                'searchQuery': '' + query + '',
                'searchResults': total
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 11. Đã test ok
//function product_list_viewed(categoryName, isSearched, listID, productIDs, products, searchQuery) {
//    try {
//        var obj = JSON.parse(target);
//        follower.track('product_list_viewed', {
//            'target': {
//                'itemType': 'product',
//                'itemId': '' + listID[0]. + '',
//                'properties': {
//                    'active': true,
//                    'brand': '' + obj.properties.brand + '',
//                    'categoryID': '' + obj.properties.categoryID + '',
//                    'categoryLevel1ID': '',
//                    'categoryLevel1Name': '',
//                    'categoryLevel2ID': '',
//                    'categoryLevel2Name': '',
//                    'categoryLevel3ID': '',
//                    'categoryLevel3Name': '',
//                    'categoryLevel4ID': '',
//                    'categoryLevel4Name': '',
//                    'categoryName': '' + obj.properties.categoryName + '',
//                    'categoryPath': '',
//                    'collection': '',
//                    'dateAdded': '' + obj.properties.dateAdded + '',
//                    'discountPercentage': obj.properties.discountPercentage,
//                    'discountValue': obj.properties.discountValue,
//                    'fashionSeason': '',
//                    'price': obj.properties.price,
//                    'priceAfterDiscount': obj.properties.priceAfterDiscount,
//                    'productID': '' + obj.properties.productID + '',
//                    'title': '' + obj.properties.title + '',
//                    'webCategoryLevel1': '',
//                    'webCategoryLevel2': '',
//                    'webCategoryLevel3': '',
//                    'webImage': '' + obj.properties.webImage + '',
//                    'webUrl': '' + obj.properties.webUrl + '',
//                    'yearAdded': '' + obj.properties.yearAdded + ''
//                }
//            },
//            'properties': {
//                'category': categoryName,
//                'isSearched': isSearched,
//                'listID': listID,
//                'productIDs': productIDs,     //aray
//                'products': products,         //array
//                'searchQuery': searchQuery
//            }
//        });
//    }
//    catch (ex) {
//        console.log(ex);
//    }
//}


//function 12. Đã test lỗi

//function 13. promotion_Viewed Chuyển vào View Đã test OK

//function 14. Đã test OK
function promotion_clicked(name, promotionID) {
    try {
        follower.track('promotion_clicked', {
            'properties': {
                'creative': 'BANNER',
                'name': '' + name + '',
                'position': 'HOME',
                'promotionID': '' + promotionID + ''
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//function 15. product_clicked trong View Đã test OK
function product_clicked(productID) {
    $.ajax({
        url: '/ajax/GetProductInfo.html',
        data: 'ProductID=' + productID,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            if (node1 !== '') {
                var obj = JSON.parse(node1);
                try {
                    follower.track("product_clicked", {
                        "target": {
                            "itemType": "product",
                            "itemId": obj.itemId + "",
                            "properties": {
                                "active": true,
                                "brand": "" + obj.brand,
                                "categoryID": "" + obj.categoryID,
                                "categoryLevel1ID": "",
                                "categoryLevel1Name": "",
                                "categoryLevel2ID": "",
                                "categoryLevel2Name": "",
                                "categoryLevel3ID": "",
                                "categoryLevel3Name": "",
                                "categoryLevel4ID": "",
                                "categoryLevel4Name": "",
                                "categoryName": "" + obj.categoryName,
                                "categoryPath": "",
                                "collection": "",
                                "dateAdded": "" + obj.dateAdded,
                                "discountPercentage": parseInt(obj.discountPercentage),
                                "discountValue": parseInt(obj.discountValue),
                                "fashionSeason": "",
                                "price": parseInt(obj.price),
                                "priceAfterDiscount": parseInt(obj.priceAfterDiscount),
                                "productID": "" + obj.productID,
                                "title": "" + obj.title,
                                "webCategoryLevel1": "",
                                "webCategoryLevel2": "",
                                "webCategoryLevel3": "",
                                "webImage": "" + obj.webImage,
                                "webUrl": "" + obj.webUrl,
                                "yearAdded": "" + obj.yearAdded
                            }
                        },
                        "properties": {
                            "product": obj.productID.split(',')
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
    });

}
//function 16. product_viewed trong View Đã test OK
//function 17. item_viewed trong View Đã test OK
//function 18. item_added trong View Đã test OK
//function 19
function item_removed(productID, color, size) {
    $.ajax({
        url: '/ajax/GetProductInfo.html',
        data: 'ProductID=' + productID,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            if (node1 !== '') {
                var obj = JSON.parse(node1);
                try {
                    follower.track("item_removed", {
                        "target": {
                            "itemType": "item",
                            "itemId": obj.itemId + "",
                            "properties": {
                                "active": true,
                                "brand": obj.brand + "",
                                "category": obj.categoryName + "",
                                "categoryID": obj.categoryID + "",
                                "categoryLevel1ID": "",
                                "categoryLevel1Name": "",
                                "categoryLevel2ID": "",
                                "categoryLevel2Name": "",
                                "categoryLevel3ID": "",
                                "categoryLevel3Name": "",
                                "categoryLevel4ID": "",
                                "categoryLevel4Name": "",
                                "categoryName": obj.categoryName + "",
                                "categoryPath": "",
                                "collection": "",
                                "color": "" + color,
                                "colorID": "" + color,
                                "colorName": "" + color,
                                "dateAdded": obj.dateAdded + "",
                                "description": obj.title + "",
                                "discountPercentage": parseInt(obj.discountPercentage),
                                "discountValue": parseInt(obj.discountValue),
                                "fashionSeason": "",
                                "form": "",
                                "gender": "",
                                "itemID": obj.itemId + "",
                                "material": "",
                                "price": obj.price + "",
                                "priceAfterDiscount": parseInt(obj.priceAfterDiscount),
                                "product": obj.title + "",
                                "productID": obj.productID + "",
                                "productName": obj.title + "",
                                "size": "" + size,
                                "stockLevel": 1,
                                "stockStatus": false,
                                "title": obj.title + "",
                                "webCategoryLevel1": "",
                                "webCategoryLevel2": "",
                                "webCategoryLevel3": "",
                                "webImage": obj.webImage + "",
                                "webUrl": obj.webUrl + "",
                                "yearAdded": obj.yearAdded + ""
                            }
                        },
                        "properties": {
                            "cartID": obj.itemId + "",
                            "quantity": 1,
                            "valueRemoved": 1
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
    });
}

//function 20 cart_viewed trong View Đã test OK

//function 21  Click nút thanh toán Không còn trên hệ thống

//function 22 - item_checkout_started - trong view  -    ok

//function 23 - checkout_step_1_viewed  - trong view - ok

//function 24,25,26,27, 28 trong View
function voucher_entered(voucherText, checkoutID) {
    try {
        follower.track("Voucher_Entered", {
            "properties": {
                "checkoutID": "" + checkoutID,
                "voucherText": "" + voucherText
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function voucher_denied(checkoutID, orderID, reason, voucherText) {
    try {
        follower.track("Voucher_Denied", {
            "properties": {
                "checkoutID": "" + checkoutID,
                "orderID": "" + orderID,
                "reason": "" + reason,
                "voucherText": "" + voucherText
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function voucher_applied(voucherjson) {
    try {
        if (voucherjson !== '') {
            var obj = JSON.parse(voucherjson);
            follower.track("voucher_applied", {
                "target": {
                    "itemType": "voucher",
                    "itemId": "" + obj.itemId,
                    "properties": {
                        "acceptedUnits": "" + obj.acceptedUnits,
                        "applyTo": "" + obj.applyTo,
                        "campaign": "" + obj.campaign,
                        "effectiveDate": "" + obj.effectiveDate,
                        "expiryDate": "" + obj.expiryDate,
                        "minOrderValue": parseInt(obj.minOrderValue),
                        "quantity": parseInt(obj.quantity),
                        "totalOrderDiscount": "" + obj.totalOrderDiscount,
                        "voucherID": "" + obj.voucherID,
                        "voucherIssueType": "" + obj.voucherIssueType,
                        "voucherPercentage": parseInt(obj.voucherPercentage),
                        "voucherType": "" + obj.voucherType,
                        "voucherValue": parseInt(obj.voucherValue)
                    }
                },
                "properties": {
                    "checkoutID": "" + obj.checkoutID,
                    "discount": parseInt(obj.discount),
                    "orderID": "" + obj.orderID
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function voucher_removed(voucherjson) {
    try {
        if (voucherjson !== '') {
            var obj = JSON.parse(voucherjson);
            follower.track("voucher_removed", {
                "target": {
                    "itemType": "voucher",
                    "itemId": "" + obj.itemId,
                    "properties": {
                        "acceptedUnits": "" + obj.acceptedUnits,
                        "applyTo": "" + obj.applyTo,
                        "campaign": "" + obj.campaign,
                        "effectiveDate": "" + obj.effectiveDate,
                        "expiryDate": "" + obj.expiryDate,
                        "minOrderValue": parseInt(obj.minOrderValue),
                        "quantity": parseInt(obj.quantity),
                        "totalOrderDiscount": "" + obj.totalOrderDiscount,
                        "voucherID": "" + obj.voucherID,
                        "voucherIssueType": "" + obj.voucherIssueType,
                        "voucherPercentage": parseInt(obj.voucherPercentage),
                        "voucherType": "" + obj.voucherType,
                        "voucherValue": parseInt(obj.voucherValue)
                    }
                },
                "properties": {
                    "checkoutID": "" + obj.checkoutID,
                    "discount": parseInt(obj.discount),
                    "orderID": "" + obj.orderID
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function new_address_added(voucherjson) {
    try {
        if (voucherjson !== "") {
            var obj = JSON.parse(voucherjson);
            follower.track("New_Address_Added", {
                "properties": {
                    "checkoutID": obj.checkoutID,
                    "city": obj.city,
                    "deliveryTime": obj.deliveryTime,
                    "district": obj.district,
                    "eventLocation": obj.eventLocation,
                    "shippingAddress": obj.shippingAddress,
                    "shippingName": obj.shippingName,
                    "shippingNumber": obj.shippingNumber
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
}
function support_requested(email, message, name, service, supportType) {
    try {
        follower.track("support_requested", {
            "properties": {
                "email": "" + email,
                "message": "" + message,
                "name": "" + name,
                "service": "" + service,
                "supportType": "" + supportType
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }

}
$(".icon-hotline a").click(function () {
    support_requested("", "", "", "Tư Vấn Bán Hàng", "Call");
});
$(".icon-email a").click(function () {
    support_requested("", "", "", "Tư Vấn Bán Hàng", "Email");
});
function profile_updated(dateOfBirth, email, fullName, gender, phoneNumber) {
    try {
        follower.track("profile_updated", {
            "properties": {
                "dateOfBirth": "" + dateOfBirth,
                "email": "" + email,
                "fullName": "" + fullName,
                "gender": "" + gender,
                "phoneNumber": "" + phoneNumber
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}

function store_favored(preferredStore) {
    try {
        follower.track("store_favored", {
            "properties": {
                "preferredStore": "" + preferredStore
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
function email_subscribed(email) {
    try {
        follower.track("email_subscribed", {
            "properties": {
                "email": "" + email
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
function size_picked(fit, height, weight) {
    try {
        follower.track("size_picked", {
            "properties": {
                "fit": "" + fit,
                "height": "" + height,
                "weight": "" + weight
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
}
//lading tracking
function outlet_product_clicked(productID) {
    $.ajax({
        url: '/ajax/GetProductInfo.html',
        data: 'ProductID=' + productID,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            if (node1 !== '') {
                var obj = JSON.parse(node1);
                try {
                    follower.track("outlet_product_clicked", {
                        "target": {
                            "itemType": "product",
                            "itemId": obj.itemId + "",
                            "properties": {
                                "active": true,
                                "brand": "" + obj.brand,
                                "categoryID": "" + obj.categoryID,
                                "categoryLevel1ID": "",
                                "categoryLevel1Name": "",
                                "categoryLevel2ID": "",
                                "categoryLevel2Name": "",
                                "categoryLevel3ID": "",
                                "categoryLevel3Name": "",
                                "categoryLevel4ID": "",
                                "categoryLevel4Name": "",
                                "categoryName": "" + obj.categoryName,
                                "categoryPath": "",
                                "collection": "",
                                "dateAdded": "" + obj.dateAdded,
                                "discountPercentage": parseInt(obj.discountPercentage),
                                "discountValue": parseInt(obj.discountValue),
                                "fashionSeason": "",
                                "price": parseInt(obj.price),
                                "priceAfterDiscount": parseInt(obj.priceAfterDiscount),
                                "productID": "" + obj.productID,
                                "title": "" + obj.title,
                                "webCategoryLevel1": "",
                                "webCategoryLevel2": "",
                                "webCategoryLevel3": "",
                                "webImage": "" + obj.webImage,
                                "webUrl": "" + obj.webUrl,
                                "yearAdded": "" + obj.yearAdded
                            }
                        },
                        "properties": {
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
    });

}
$(".outlet_click_a").click(function () {
    var productID = $(this).data("id");
    outlet_product_clicked(productID);
});
function product_list_filtered(datastring) {
    try {
        $.ajax({
            url: '/ajax/GetTrackingFilter.html',
            data: datastring,
            type: 'POST',
            success: function (data) {
                var tracking = data.Node1;
                if (tracking != '') {
                    var obj = JSON.parse(tracking);
                    follower.track("copy_from_Product_List_Filtered", {
                        "properties": {
                            "category": "" + obj.category,
                            "filter1": "" + obj.filter1,
                            "filter1Type": "" + obj.filter1Type,
                            "filter1Value": "" + obj.filter1Value,
                            "isSearched": Boolean(obj.isSearched),
                            "listID": "" + obj.listID,
                            "productIDs": obj.productIDs,
                            "products": obj.products,
                            "searchQuery": "" + obj.searchQuery,
                            "sort1": "" + obj.sort1,
                            "sort1Value": "" + obj.sort1Value
                        }
                    });
                }
            }
        });
    } catch (e) {
        console.log(e.message);
    }
}

function item_viewed(productID, color, size) {
    $.ajax({
        url: '/ajax/GetProductInfo.html',
        data: 'ProductID=' + productID,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            if (node1 !== '') {
                var obj = JSON.parse(node1);
                try {
                    follower.track("item_viewed", {
                        "target": {
                            "itemType": "item",
                            "itemId": obj.itemId + "",
                            "properties": {
                                "active": true,
                                "brand": obj.brand + "",
                                "category": obj.categoryName + "",
                                "categoryID": obj.categoryID + "",
                                "categoryLevel1ID": "",
                                "categoryLevel1Name": "",
                                "categoryLevel2ID": "",
                                "categoryLevel2Name": "",
                                "categoryLevel3ID": "",
                                "categoryLevel3Name": "",
                                "categoryLevel4ID": "",
                                "categoryLevel4Name": "",
                                "categoryName": obj.categoryName + "",
                                "categoryPath": "",
                                "collection": "",
                                "color": "" + color,
                                "colorID": "" + color,
                                "colorName": "" + color,
                                "dateAdded": obj.dateAdded + "",
                                "description": obj.title + "",
                                "discountPercentage": parseInt(obj.discountPercentage),
                                "discountValue": parseInt(obj.discountValue),
                                "fashionSeason": "",
                                "form": "",
                                "gender": "",
                                "itemID": obj.itemId + "",
                                "material": "",
                                "price": obj.price + "",
                                "priceAfterDiscount": parseInt(obj.priceAfterDiscount),
                                "product": obj.title + "",
                                "productID": obj.productID + "",
                                "productName": obj.title + "",
                                "size": "" + size,
                                "stockLevel": 1,
                                "stockStatus": false,
                                "title": obj.title + "",
                                "webCategoryLevel1": "",
                                "webCategoryLevel2": "",
                                "webCategoryLevel3": "",
                                "webImage": obj.webImage + "",
                                "webUrl": obj.webUrl + "",
                                "yearAdded": obj.yearAdded + ""
                            }
                        },
                        "properties": {
                        }
                    });
                }
                catch (ex) {
                    console.log(ex);
                }
            }
        }
    });
}


function tracking_identify(identifyJSON) {
    try {
        if (identifyJSON != "") {
            var obj = JSON.parse(identifyJSON);
            var objectToSend = {};
            for (const property in obj) {
                console.log(`${property}: ${obj[property]}`);
                if (obj[property] && obj[property] != null) objectToSend[property] = "" + obj[property];
            }
            console.log(objectToSend);
            follower.identify("" + obj.customerID, objectToSend);
        }
    } catch (e) {
        console.log(e.message);
    }
}


//Identify 
//function tracking_identify(identifyJSON) {
//    try {
//        if (identifyJSON != "") {
//            var obj = JSON.parse(identifyJSON);
//            follower.identify("" + obj.customerID, {
//                "customerID": "" + obj.customerID,
//                "full_name": "" + obj.full_name,
//                "email": "" + obj.email,
//                "signupDate": "" + obj.signupDate,
//                "loginDate": "" + obj.loginDate,
//                "phone_number": "" + obj.phone_number,
//                "signupSource": "" + obj.signupSource,
//                "date_of_birth": "" + obj.date_of_birth,
//                "gender": "" + obj.gender,
//                "store": "" + obj.store,
//                "paymentMethod": "" + obj.paymentMethod,
//                "shippingName1": "" + obj.shippingName1,
//                "shippingNumber1": "" + obj.shippingNumber1,
//                "shippingAddress1": "" + obj.shippingAddress1,
//                "city1": "" + obj.city1,
//                "district1": "" + obj.district1
//            });
//        }
//    } catch (e) {
//        console.log(e.message);
//    }
//}

//function identify_voucher_successful(customerID, full_name, email, phone_number, gender, date_of_birth, voucher, store) {
//    try {
//        follower.identify(customerID, {
//            'customerID': customerID,
//            'full_name': full_name,
//            'email': email,
//            'signupDate': '',
//            'loginDate': '',
//            'phone_number': phone_number,
//            'signupSource': '',
//            'date_of_birth': date_of_birth,
//            'gender': gender,
//            'store': store,
//            'voucher': voucher,
//            'paymentMethod': paymentMethod,
//            'shippingName1': '',
//            'shippingNumber1': '',
//            'shippingAddress1': '',
//            'city1': '',
//            'district1': ''
//        });
//    }
//    catch (ex) {
//        console.log(ex);
//    }
//}
