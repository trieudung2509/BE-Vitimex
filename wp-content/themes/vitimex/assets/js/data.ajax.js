function filter_product(url, keyword, page, type) {
    $('.loading').show();

    //form
    var cbForm = $('.filter-box-form input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var form = cbForm.join(',');

    //size
    var cbSize = $('.filter-box-size input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var size = cbSize.join(',');

    //color
    var cbColor = $('.filter-box-color input[type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var color = cbColor.join(',');

    var sort = $('.filter-bg select').val();
    var min = $('#min').val();
    var max = $('#max').val();

    url = url + '?keyword=' + keyword + '&page=' + page + '&sort=' + sort + '&form=' + form + '&size=' + size + '&color=' + color + '&min=' + min + '&max=' + max;
    console.log('filter:' + url);
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'html',
        success: function (data) {
            $('.loading').hide();

            //product_list_filtered($('#Category').val(), '', $('#MenuID').val(), $('#ListID').val(), $('#ArrID').val(), $('#ArrName').val(), '', sort, '');

            var header = $(data).find('.product-list-nav').html();
            var content = $(data).find('.product-list').html();
            var footer = $(data).find('ul.page').html();

            header = $.trim(header);
            content = $.trim(content);
            footer = $.trim(footer);

            $('.product-list-nav').html(header);
            $('.product-list').html(content);
            $('ul.page').html(footer);

            $('.filter-bg select').on('change', function () {
                filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'));
            });
        },
        error: function () { }
    });

    //tracking
    var menuID = $("#MenuID").val();
    var filterType = type;
    if (type == "") filterType = "Khoảng giá";
    var dataTracking = 'MenuID=' + menuID + '&keyword=' + keyword + '&page=' + page + '&sort=' + sort + '&form=' + form + '&size=' + size + '&color=' + color + '&min=' + min + '&max=' + max + '&filterType=' + filterType;
    product_list_filtered(dataTracking);
}

function getChild(e, ParentID, SelectedID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetChild.html',
        data: 'ParentID=' + ParentID + '&SelectedID=' + SelectedID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();
            var node1 = data.Node1;
            $(e).html(node1);
        }
    });
}

function getSearch(keyword) {
    $.ajax({
        url: '/ajax/GetSearch.html',
        data: 'Keyword=' + keyword,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            $('.search-result').html(node1);
            $('.search-result').css('display', 'inline-block');
        }
    });
}

function checkout(SiteCode) {
    $('.loading').show();

    $.ajax({
        url: '/' + SiteCode + '/ajax/CheckOut.html',
        data: $('#cart_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;

            if (params != '') {
                $('.cart-submit').val('Lỗi. F5 thử lại');
                zebra_alert('Thông báo !', params);
                return;
            }

            if (html != '') {
                $('.cart-submit').val('Hoàn thành');
                zebra_infor('Thông báo !', html, '/');
                return;
            }
        }
    });
}

function trade(SiteCode) {
    $('.loading').show();

    $.ajax({
        url: '/' + SiteCode + '/ajax/Trade.html',
        data: new FormData($('#trade_form')[0]),
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;

            if (params != '') {
                $('#trade_id').html(params);
                return;
            }

            if (html != '') {
                $('#trade_id').html(html);
                return;
            }
        }
    });
}

function contact(SiteCode) {
    $('.loading').show();

    $.ajax({
        url: '/' + SiteCode + '/ajax/Contact.html',
        data: $('#contact_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;

            if (params != '') {
                $('#contact_id').html(params);
                return;
            }

            if (html != '') {
                $('#contact_id').html(html);
                return;
            }
        }
    });
}


function subscribe() {
    $('.loading').show();
    $.ajax({
        url: '/ajax/Subscribe.html',
        data: $('#subscribe_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var html = data.Node1;
            var params = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (params != '') {
                sw_alert('Thông báo !', params);
                return;
            }
            sw_alert('Thông báo !', 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
            if (node3 != '') {
                var obj = JSON.parse(node3);
                email_subscribed(obj.email);
                if (identify != '') {
                    tracking_identify(identify);
                }
            }
            return;
        }
    });
}

function getsizechart() {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetSizeChart.html',
        data: $('#sizechart_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var tracking = data.Tracking;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            $('.size-result').html('Size phù hợp với lựa chọn của bạn là: <span>' + node1 + '</span>');
            if (tracking != "") {
                var obj = JSON.parse(tracking);
                size_picked(obj.fit, obj.height, obj.weight);
            }
        }
    });
}

function popup() {
    $('.loading').show();
    $.ajax({
        url: '/ajax/Popup.html',
        data: $('#popup_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;
            if (node2 != '') {
                $('.popup-error').html(node2);
                popup_failed(node2);
                return;
            }
            $("#popup-modal").modal('hide');
            sw_alert('Thông báo !', 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
            if (node3 != '') {
                var obj = JSON.parse(node3);
                popup_registered(obj.email, obj.phone_number);
            }

            if (identify != '') {
                tracking_identify(identify);
            }
        }
    });
}

function feedback() {
    $('.loading').show();

    $.ajax({
        url: '/ajax/Feedback.html',
        data: $('#feedback_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            $("#feeback-modal").modal('hide');
            sw_alert('Thông báo !', 'Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
            if (identify != '') {
                tracking_identify(identify);
            }
        }
    });
}

function register(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/RegisterPOST.html',
        data: $('#register_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var node4 = data.Node4;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                signup_failed(node2);
                return;
            }

            if (node1 != '') {
                sw_redirect('Thông báo !', node1, node4);
                if (node3 != '') {
                    try {
                        var obj = JSON.parse(node3);
                        var signupSource = "Content";
                        if (node4 != "/") { signupSource = "invoice request"; }
                        sign_up_successful(obj.email, obj.fullName, obj.phoneNumber, obj.signupDate, signupSource);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                if (identify != '') {
                    tracking_identify(identify);
                }
				
				setInterval(
				  function(){ location.href = 'https://aristino.com/'; },
				  2000
				);
				
                //return;
            }
        }
    });
}

function login(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/LoginPOST.html',
        data: $('#login_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;
            if (node2 != '') {
                if (node3 != '')
                    login_failed(node3);

                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                if (node3 != '') {
                    try {
                        var obj = JSON.parse(node3);
                        login_successful(obj.loginDate);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                if (identify != '') {
                    tracking_identify(identify);
                }

				setInterval(
				  function(){ location.href = 'https://aristino.com/'; },
				  2000
				);

                //location.href = node1;
				//location.href = 'https://aristino.com/';
            }
        }
    });
}

function addShipping(url) {
    $('.loading').show();
    var checkoutID = $("#CheckoutID").val();
    $.ajax({
        url: '/' + url + '/AddShipping.html',
        data: $('#shipping_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var node4 = data.Node4;
            var tracking = data.Tracking;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                try {
                    if (node4 != '') sw_redirect('Thông báo !', node1, node4);
                    else
                        sw_redirect('Thông báo !', node1, '/' + url + '.html');
                }
                catch (ex) {
                    console.log(ex);
                }
                if (tracking !== "") {
                    new_address_added(tracking);
                }
                if (identify != '') {
                    tracking_identify(identify);
                }
                return;
            }
        }
    });
}

function delShipping(url, id) {
    $.ajax({
        url: '/' + url + '/DelShipping.html',
        data: 'id=' + id,
        type: 'GET',
        success: function (data) {
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            location.href = '/' + url + '.html';
        }
    });
}

function defaultShipping(url, id) {
    $.ajax({
        url: '/' + url + '/DefaultShipping.html',
        data: 'id=' + id,
        type: 'GET',
        success: function (data) {
            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_redirect('Thông báo !', node1, '/' + url + '.html');
                return;
            }
        }
    });
}

function changeInfo(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/InfoPOST.html',
        data: $('#info_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var tracking = data.Tracking;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                try {
                    sw_redirect('Thông báo !', node1, '/' + url + '.html');
                    if (tracking !== "") {
                        var obj = JSON.parse(tracking);
                        profile_updated(obj.dateOfBirth, obj.email, obj.fullName, obj.gender, obj.phoneNumber)
                    }
                    if (identify != '') {
                        tracking_identify(identify);
                    }
                }
                catch (ex) {
                    console.log(ex);
                }

                return;
            }
        }
    });
}

function changePassword(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/PasswordPOST.html',
        data: $('#password_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_redirect('Thông báo !', node1, '/' + url + '.html');
                return;
            }
        }
    });
}

//function validateOtp(url) {
//    $('.loading').show();

//    $.ajax({
//        url: '/' + url + '/ValidatePOST.html',
//        data: $('#otp_form').serialize(),
//        type: 'POST',
//        success: function (data) {
//            $('.loading').hide();

//            var node1 = data.Node1;
//            var node2 = data.Node2;

//            if (node2 != '') {
//                sw_alert('Thông báo !', node2);
//                return;
//            }

//            $('#reset_form').find('#Phone2').val($('#otp_form').find('#Phone').val());

//            if (node1 != '') {
//                sw_alert('Thông báo !', node1);
//                return;
//            }
//        }
//    });
//}

function resetPassword(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/ResetPOST.html',
        data: $('#reset_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_alert('Thông báo !', node1);
                return;
            }
        }
    });
}

function setShop(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/ShopPOST.html',
        data: $('#shop_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var identify = data.Identify;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            if (node1 != '') {
                sw_alert('Thông báo !', node1);
                if (node3 != '') {
                    var obj = JSON.parse(node3);
                    store_favored(obj.store);
                }
                if (identify != '') {
                    tracking_identify(identify);
                }
                return;
            }
        }
    });
}

function checkVoucher(url) {
    $('.loading').show();
    var voucherID = $("#Voucher").val();
    var checkoutID = $("#CheckoutID").val();
    voucher_entered(voucherID, checkoutID);

    $.ajax({
        url: '/' + url + '/CheckVoucher.html',
        data: $('#voucher_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;
            var node3 = data.Node3;
            var tracking = data.Tracking;
            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                voucher_denied(checkoutID, checkoutID, node2, voucherID);
                return;
            }
            //voucher_applied(voucherID, checkoutID, node3);
            //identify_user_voucher_applied(voucherID);
            location.href = location.href;
            if (tracking !== "") {
                voucher_applied(tracking);
            }

        }
    });
}

function removeVoucher(url, SoVC) {
    $('.loading').show();
    var checkoutID = $("#CheckoutID").val();
    $.ajax({
        url: '/' + url + '/RemoveVoucher.html',
        data: 'SoVC=' + SoVC,
        type: 'GET',
        success: function (data) {
            var node2 = data.Node1;
            var node3 = data.Node3;
            var node4 = data.Node4;
            var tracking = data.Tracking;
            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }
            location.href = location.href;
            if (tracking !== "") {
                voucher_removed(tracking);
            }

        }
    });
}

function checkFreeCode(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/CheckFreeCode.html',
        data: $('#freecode_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            $('#Fee').val(0);

            location.href = location.href;
        }
    });
}

function getSize(color) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetSize.html',
        data: 'ColorID=' + color,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            $('.get-size').html(node1);

            $('.product-sizes input[type="radio"]').click(function () {
                $('#SizeID').val($(this).val());
                $('#Quantity').val($(this).data('quantity'));
            });
        }
    });
}

function choosePromotion(color) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetSize.html',
        data: 'ColorID=' + color,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            $('.get-size').html(node1);

            $('.product-sizes input[type="radio"]').click(function () {
                $('#SizeID').val($(this).val());

                storageCheck($('#ColorID').val(), $('#SizeID').val());
            });
        }
    });
}

function getShipping(shippingID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetShipping.html',
        data: 'ShippingID=' + shippingID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var city = data.Node2;
            var district = data.Node3;

            $('.shipping-info').html(node1);
            $('#SCityID').val(city);
            $('#SDistrictID').val(district);
        }
    });
}

function getDelivery(PaymentID, Total, CityID, DistrictID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetDelivery.html',
        data: 'PaymentID=' + PaymentID + '&Total=' + Total + '&CityID=' + CityID + '&DistrictID=' + DistrictID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();
            var node1 = data.Node1;
            var node3 = data.Node3;
            var identify = data.Identify;
            $('.list-delivery').html(node1);
            $('.list-delivery input').click(function () {
                var fee = $(this).data('fee');
                setDelivery(fee);
            });

            //var total = parseInt($('#Total').data('totalwithoutfee')) + parseInt(fee);
            //$('.total-order').html(addCommas(total));

            var fee = $("#DeliveryID13415").data('fee');
            setDelivery(fee);
            if (identify != '') {
                tracking_identify(identify);
            }
			
			if ($('#DeliveryID13418').length) {
                $('#DeliveryID13418').trigger('click');
            }
        }
    });
}
function setDelivery(fee) {
    $('#Fee').val(fee);
    $('.delivery-value').html(addCommas(fee));
    var total = parseInt($('#Total').data('totalwithoutfee')) + parseInt(fee);
    $('.total-order').html(addCommas(total));
    $('.total__price').html(addCommas(total) + " đ");
}

function GetPhone(url) {
    $('.loading').show();

    $.ajax({
        url: '/' + url + '/SubsribePOST.html',
        data: $('#phone_form').serialize(),
        type: 'POST',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;
            var node2 = data.Node2;

            if (node2 != '') {
                sw_alert('Thông báo !', node2);
                return;
            }

            if (node1 != '') {
                sw_alert('Thông báo !', node1);
                return;
            }
        }
    });
}

function getShowroom(menuID) {
    $('.loading').show();

    $.ajax({
        url: '/ajax/GetShowroom.html',
        data: 'MenuID=' + menuID,
        type: 'GET',
        success: function (data) {
            $('.loading').hide();

            var node1 = data.Node1;

            $('.list-showroom').html(node1);
        }
    });
}