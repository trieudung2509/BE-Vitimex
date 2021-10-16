$(function () {
    if ($('.btn-sendorder').length > 0) {
        $('.btn-sendorder').prop('disabled', false)
    }

    $('.payment-selected input').click(function () {
        getDelivery($(this).data('id'), $('#Total').val(), $('#SCityID').val(), $('#SDistrictID').val())
    })

    if ($('.fancy-box').length) {
        $('.fancy-box').fancybox({
            maxWidth: 900,
            maxHeight: 600,
            fitToView: true,
            width: 900,
            height: 600,
            autoSize: true
        })
    }

    //đơn hàng-promotion
    $('.promotion-item input[type="radio"]').click(function () {
        $('#Promotion').val($(this).val())
    })

    //timer
    $('.timer').each(function () {
        var dt = $(this).data('date')
        $(this).countdown(dt, function (e) {
            $(this).text(
                e.strftime('%D ngày %H:%M:%S')
            )
        })
    })
    //timer
    $('.flashsale').each(function () {
        var dt = $(this).data('date')
        $(this).countdown(dt, function (e) {
            $(this).html(
                e.strftime('<b>%D</b> ngày <b>%H</b><b>%M</b><b>%S</b>')
            )
        })
    })

    //color
    if ($('#ColorID').length > 0) {
        $('.product-colors li:first-child input[type="radio"]').trigger('click')
        $('#ColorID').val($('.product-colors li:first-child input[type="radio"]').val())
        getSize($('#ColorID').val())
    }

    $('.product-colors input[type="radio"]').click(function () {
        $('#ColorID').val($(this).val())

        getSize($('#ColorID').val())
    })

    //color
    $('.product-sizes input[type="radio"]').click(function () {
        if ($('#ColorID').val() < 1) {
            sw_alert('Thông báo !', 'Bạn chưa chọn màu sắc.')
            return
        }

        $('#SizeID').val($(this).val())
        $('#Quantity').val($(this).data('quantity'))
    })

    //tìm size
    $('#sizechart_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-sizechart').trigger('click')
    })

    $('.btn-sizechart').click(function () {
        getsizechart()
    })

    //subscribe
    $('#subscribe_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-subscribe').trigger('click')
    })

    $('.btn-subscribe').click(function () {
        subscribe()
    })

    //get phone
    $('#phone_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-phone').trigger('click')
    })

    $('.btn-phone').click(function () {
        GetPhone($(this).data('url'))
    })

    //check voucher
    $('#voucher_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-voucher').trigger('click')
    })

    $('.btn-voucher').click(function () {
        checkVoucher($(this).data('url'))
    })

    //check mã free ship
    $('#freecode_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-freecode').trigger('click')
    })

    $('.btn-freecode').click(function () {
        checkFreeCode($(this).data('url'))
    })

    //change info
    $('#info_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-info').trigger('click')
    })

    $('.btn-info').click(function () {
        changeInfo($(this).data('url'))
    })

    //change password
    $('#password_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-password').trigger('click')
    })

    $('.btn-password').click(function () {
        changePassword($(this).data('url'))
    })

    //change password
    $('#shop_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-shop').trigger('click')
    })

    $('.btn-shop').click(function () {
        setShop($(this).data('url'))
    })

    //login
    $('#login_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-login').trigger('click')
    })

    $('.btn-login').click(function () {
        login($(this).data('url'))
    })

    //register
    $('#register_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-register').trigger('click')
    })

    $('.btn-register').click(function () {
        register($(this).data('url'))
    })

    //otp
    $('#otp_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-otp').trigger('click')
    })

    //$('.btn-otp').click(function () {
    //    validateOtp($(this).data('url'));
    //})

    //reset
    $('#reset_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-reset').trigger('click')
    })

    $('.btn-reset').click(function () {
        resetPassword($(this).data('url'))
    })

    //add shipping
    $('#shipping_form').on('submit', function (e) {
        e.preventDefault()
        $('.btn-shipping').trigger('click')
    })

    $('.btn-shipping').click(function () {
        addShipping($('#ShippingUrl').val())
    })

    //$('#SupportRequestedCall').click(function () {
    //    support_requested("Call");
    //})
    //$('#SupportRequestedEmail').click(function () {
    //    support_requested("Email");
    //})
    //$('#cs-div-drag').click(function () {
    //    support_requested("Live Chat");
    //})

    $('.del-shipping').click(function () {
        delShipping($('#ShippingUrl').val(), $(this).data('id'))
    })

    $('.edit-shipping').click(function () {
        editShipping($('#ShippingUrl').val(), $(this).data('id'))
    })

    $('.default-shipping').click(function () {
        defaultShipping($('#ShippingUrl').val(), $(this).data('id'))
    })

    $('.btn-cart').click(function () {
        add_cart($(this).data('id'), $('#ReturnPath').val())
    })

    $('.filter-box-form a').on('click', function () {
        $('.filter-box-form input').prop('checked', false)

        if ($(this).find('input').is(':checked'))
            $(this).find('input').prop('checked', false)
        else {
            $('.filter-box-color input').prop('checked', false)
            $(this).find('input').prop('checked', true)
        }
        var type = "form"
        filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'), type)
    })

    $('.filter-box-color a').on('click', function () {
        if ($(this).find('input').is(':checked'))
            $(this).find('input').prop('checked', false)
        else {
            $('.filter-box-color input').prop('checked', false)
            $(this).find('input').prop('checked', true)
        }


        //$('.filter-box-color input').prop('checked', false);
        //$(this).find('input').prop('checked', true);
        var type = "color"
        filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'), type)
    })

    $('.filter-box-size a').on('click', function () {
        if ($(this).find('input').is(':checked'))
            $(this).find('input').prop('checked', false)
        else {
            $('.filter-box-size input').prop('checked', false)
            $(this).find('input').prop('checked', true)
        }

        //$('.filter-box-size input').prop('checked', false);
        //$(this).find('input').prop('checked', true);
        var type = "size"
        filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'), type)
    })

    $('.filter-bg select').on('change', function () {
        var type = "sort"
        filter_product($(this).data('url'), $(this).data('keyword'), $(this).data('page'), type)
    })

    $('.collapse.in').prev('.panel-heading').addClass('active')
    $('#bs-collapse, #accordion').on('show.bs.collapse', function (a) {
        $(a.target).prev('.panel-heading').addClass('active')
    }).on('hide.bs.collapse', function (a) {
        $(a.target).prev('.panel-heading').removeClass('active')
    })

    $('.js-side-drawer-toggler').on('click', function () {
        $('.side-drawer').toggleClass('is-opened')
        $('body').toggleClass('side-drawer--is-opened')
    })

    //Search Bar
    $('#keyword').focus()
    $('.search__open').on('click', function () {
        $('body').toggleClass('search__box__show__hide')
        $('#keyword').focus()

        return false
    })


    $('.search__close__btn .search__close__btn_icon').on('click', function () {
        $('body').toggleClass('search__box__show__hide')

        return false
    })

    //cart quantity
    $('.cart-plus-minus').prepend('<div class=""dec qtybutton">-</div>')
    $('.cart-plus-minus').append('<div class="inc qtybutton">+</div>')
    $('.qtybutton').on("click", function () {
        var newVal = 1
        var $button = $(this)
        var oldValue = $button.parent().find('input').val()
        if ($button.text() == "+") {
            newVal = parseFloat(oldValue) + 1
        } else {
            if (oldValue > 1) {
                newVal = parseFloat(oldValue) - 1
            } else {
                newVal = 1
            }
        }
        $button.parent().find('input').val(newVal)
    })

    $('.cart__menu').on('click', function () {
        $('.shopping__cart').addClass('shopping__cart__on')
        $('.body__overlay').addClass('is-visible')
    })

    $('.offsetmenu__close__btn').on('click', function () {
        $('.shopping__cart').removeClass('shopping__cart__on')
        $('.body__overlay').removeClass('is-visible')
    })

    //scroll menu
    //$(window).scroll(function () {
    //    //if ($(this).scrollTop() > 30) {
    //    //    $('.header-search').addClass('header-search-s animated');
    //    //} else {
    //    //    $('.header-search').removeClass('header-search-s animated');
    //    //}

    //    //if ($(this).scrollTop() > 50) {
    //    //    $('.wp-main-menu').addClass('menu-fix animated');
    //    //} else {
    //    //    $('.wp-main-menu').removeClass('menu-fix animated');
    //    //}

    //    //if ($(this).scrollTop() > 50) {
    //    //    $('.add-fix').addClass('fix-checkout animated');
    //    //} else {
    //    //    $('.add-fix').removeClass('fix-checkout animated');
    //    //}

    //    //if ($(window).width() < 1300) {
    //    //    if ($(this).scrollTop() > 50) {
    //    //        $('.icon-email').addClass('icon-email-fix animated');
    //    //    } else {
    //    //        $('.icon-email').removeClass('icon-email-fix animated');
    //    //    }
    //    //}

    //    //if ($(this).scrollTop() > 50) {
    //    //    $('.product-list-nav-wrap , .side-drawer-nav').addClass('fix animated');
    //    //} else {
    //    //    $('.product-list-nav-wrap , .side-drawer-nav').removeClass('fix animated');
    //    //}
    //});

    //delivery
    //$('.delivery-selected input').click(function () {
    //    $('.delivery-name').html($(this).data('text'));
    //    $('.delivery-value').html(addCommas($(this).data('value')));
    //    $('.total-order').html(addCommas($(this).data('total') + $(this).data('value')));
    //});

    //payment
    $('.payment-selected input').click(function () {
        $('.sub_show').hide()
        $(this).parent().parent().find('.sub_show').css("display", "block")
    })

    ////scroll Top 
    //var offset = 600;
    //var duration = 500;
    //$(window).scroll(function () {
    //    if ($(this).scrollTop() > offset) {
    //        $('.scrollup').fadeIn(duration);
    //    } else {
    //        $('.scrollup').fadeOut(duration);
    //    }
    //});
    //$('.scrollup').click(function (event) {
    //    event.preventDefault();
    //    $('html, body').animate({ scrollTop: 0 }, duration);
    //    return false;
    //})

    //hover
    $('.hover-over').mouseover(function () {
        $('.overlay').addClass('overlay-visible')
        $('.bg-black').addClass('overlay-visible')
    })
    $(document).mouseover(function (a) {
        var n = $('.hover-over')
        n.is(a.target) || 0 !== n.has(a.target).length || $('.overlay').removeClass('overlay-visible')
        n.is(a.target) || 0 !== n.has(a.target).length || $('.bg-black').removeClass('overlay-visible')
    })

    //home slider banner
    // var owl = $('#slider-home');
    // owl.owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     autoplay: true,
    //     autoplayTimeout: 15000,
    //     nav: true,
    //     navText: ['', ''],
    //     dots: true,
    //     items: 1,
    //     afterAction: function (current) {
    //         current.find('video').get(0).play();
    //     }
    // })

    //slide tin
    // $('#slider-news').owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     autoplay: true,
    //     autoplayTimeout: 5000,
    //     nav: true,
    //     navText: ['', ''],
    //     dots: true,
    //     items: 1
    // })

    //slide store
    // $('.slider-store').owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     autoplay: true,
    //     autoplayTimeout: 5000,
    //     nav: false,
    //     navText: [
    //         '<i class="fa fa-angle-left"></i>',
    //         '<i class="fa fa-angle-right"></i>'
    //     ],
    //     dots: true,
    //     items: 1
    // })

    // $('#slider-wear ').owlCarousel({
    //     loop: false,
    //     margin: 40,
    //     dots: false,
    //     nav: false,
    //     autoplay: true,
    //     autoplayTimeout: 8000,
    //     autoplaySpeed: 1800,
    //     smartSpeed: 1500,
    //     responsive: {
    //         0: {
    //             items: 2
    //         },
    //         600: {
    //             items: 4
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // })

    // $('#slider-recenly').owlCarousel({
    //     loop: false,
    //     margin: 20,
    //     dots: false,
    //     nav: true,
    //     navText: [
    //         '<i class="fa fa-angle-left"></i>',
    //         '<i class="fa fa-angle-right"></i>'
    //     ],
    //     autoplay: true,
    //     autoplayTimeout: 8000,
    //     autoplaySpeed: 1800,
    //     smartSpeed: 1500,
    //     responsive: {
    //         0: {
    //             items: 2
    //         },
    //         600: {
    //             items: 4
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // })

    $('#slider-spcl').owlCarousel({
        loop: false,
        margin: 20,
        dots: false,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        autoplay: true,
        autoplayTimeout: 8000,
        autoplaySpeed: 1800,
        smartSpeed: 1500,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    })

    $('.same-category').owlCarousel({
        loop: false,
        margin: 20,
        dots: false,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        autoplay: true,
        autoplayTimeout: 8000,
        autoplaySpeed: 1800,
        smartSpeed: 1500,
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    })

    //zoom img chi tiet sp
    //$('#zoom-detail').glassCase({
    //    'widthDisplay': 600,
    //    'heightDisplay': 688,
    //    'nrThumbsPerRow': 6,
    //    'thumbsPosition': 'bottom'
    //});
    if (document.documentElement.clientWidth > 600) {
        $("#zoom-detail").glassCase({
            widthDisplay: "500",
            isOverlayEnabled: false,
            thumbsPosition: 'bottom'
        })
    } else {
        $("#glasscase").glassCase({
            isZoomEnabled: false,
            isOverlayEnabled: false
        })
    }

    ////zoom quickview
    //$('.zoom-quick').glassCase({
    //    'widthDisplay': 600,
    //    'heightDisplay': 688,
    //    'zoomPosition': 'inner',
    //    'nrThumbsPerRow': 5,
    //    'isSlowZoom': true,
    //    'colorIcons': '#000',
    //    'colorActiveThumb': '#F15129',
    //    'thumbsPosition': 'left'
    //});
    //$('.quick-view').on('shown.bs.modal', function (e) {
    //    $('.zoom-quick').resize();
    //})

    // The slider being synced must be initialized first
    //$('.quick-view').on('shown.bs.modal', function (e) {
    //    $('.flex-left').flexslider({
    //        animation: "slide",
    //        direction: "vertical",
    //        controlNav: false,
    //        animationLoop: false,
    //        slideshow: false,
    //        itemMargin: 5,
    //        asNavFor: '.flex-main'
    //    });
    //    $('.flex-main').flexslider({
    //        animation: "slide",
    //        controlNav: false,
    //        animationLoop: false,
    //        slideshow: false,
    //        sync: ".flex-left"
    //    });
    //})

    //price slider
    $('#slider-range').slider({
        range: true,
        min: 50000,
        max: 10000000,
        values: [50000, 10000000],
        slide: function (e, data) {
            $('#min').val(data.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
            $('#max').val(data.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
            //$('#min').val(data.values[0]);
            //$('#max').val(data.values[1]);
        },
    })
})

function addCommas(nStr) {
    nStr += ''
    x = nStr.split('.')
    x1 = x[0]
    x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2')
    }
    return x1 + x2
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = function (e) {
            $(input).parent().find('img').attr('src', e.target.result)
        }

        reader.readAsDataURL(input.files[0])
    }
}

function get_code(str) {
    return remove_unicode(str).replace(/[^A-Z0-9]/gi, '')
}

function remove_unicode(str) {
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|"| |"|\&|\#|\[|\]|~|$|_/g, '-')

    str = str.replace(/-+-/g, '-')
    str = str.replace(/^\-+|\-+$/g, '')

    return str
}

function formatDollar(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}

function createCookie(name, value, minutes) {
    var expires = ''

    if (minutes) {
        var date = new Date()
        date.setTime(date.getTime() + (minutes * 60 * 1000))
        expires = '; expires=' + date.toGMTString()
    }
    document.cookie = name + '=' + value + expires + '; path=/'
}

function readCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

function eraseCookie(name) {
    createCookie(name, '', -1)
}

function add_cart(productID, returnpath) {
    if (productID < 1) {
        sw_alert('Thông báo !', 'Sản phẩm không tồn tại.')
        return
    }

    var color = $('#ColorID').val()
    var size = $('#SizeID').val()


    if (color < 1) {
        sw_alert('Thông báo !', 'Bạn chưa chọn màu sắc.')
        return
    }

    if (size < 1) {
        sw_alert('Thông báo !', 'Bạn chưa chọn kích cỡ.')
        return
    }

    if ($('#Quantity').val() < 1) {
        sw_alert('Thông báo !', 'Sản phẩm đã hết hàng.')
        return
    }
    location.href = '/gio-hang/Add.html?ProductID=' + productID + '&Quantity=1&ColorID=' + color + '&SizeID=' + size + '&returnpath=' + returnpath
    item_added(color, size)
}

function update_cart(productID, quantity, color, size, returnpath) {
    location.href = '/gio-hang/Update.html?ProductID=' + productID + '&Quantity=' + quantity + '&ColorID=' + color + '&SizeID=' + size + '&returnpath=' + returnpath
}

function delete_cart(productID, color, size, returnpath) {
    sw_confirm('Thông báo !', 'Bạn chắc chắn muốn xóa ?', '/gio-hang/Delete.html?ProductID=' + productID + '&ColorID=' + color + '&SizeID=' + size + '&returnpath=' + returnpath)
    item_removed(productID, color, size)
}

function add_favorite(ProductID, ReturnPath) {
    location.href = '/yeu-thich/Add.html?ProductID=' + ProductID + '&returnpath=' + ReturnPath
}

function playVideo(pos, file, image, width, height, auto) {
    jwplayer(pos).setup({
        file: file,
        image: image,
        abouttext: 'ANGKORICH - jwplayer build 01032015',
        width: width,
        height: height,
        stretching: 'exactfit',
        autostart: auto,
        logo: {
            file: '',
            link: '',
        }
    })
}

function change_captcha() {
    var e = Math.floor(Math.random() * 999999); document.getElementById('imgValidCode').src = '/Ajax/Security.html?Code=' + e
}
function formatDollar(value) {
    return value.split("").reverse().reduce(function (acc, value, i, orig) {
        return value + (i && !(i % 3) ? "." : "") + acc
    }, "")
}
function copyToClipboard(value) {
    var $temp = $('<input>')
    $('body').append($temp)
    $temp.val(value).select()
    document.execCommand('copy')
    $temp.remove()
}