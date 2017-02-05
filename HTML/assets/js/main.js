/*===================================
 preloader
 ===================================*/
 
// makes sure the whole site is loaded
$(window).on('load', function () {
    
    $("#loader").fadeOut();    
    $("#loader-wrapper").delay(200).fadeOut("slow");

});

/*------------------------------------------
    01. FixedTop Navigation
 ------------------------------------------*/

(function(){

    var $nav = $('#fixedTopNav');

    function navbarAnimation() {
        if ($(window).scrollTop() > 0) {
            $nav.addClass('navbar-solid');
            return;
        }
        
        $nav.removeClass('navbar-solid');
        $(".navbar-nav > li > a").blur();
    }

    navbarAnimation();

    $(window).scroll(function() {
        navbarAnimation();
    });

})();




var navbar      = $('.main-navigation'),
    width       = Math.max($(window).width(), window.innerWidth),
    mobileTest;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobileTest = true;
}



/* ---------------------------------------------- /*
 * Navbar submenu
 /* ---------------------------------------------- */

function navbarSubmenu(width) {
    if (width > 767) {
        $('.main-navigation .navbar-nav > li.dropdown').hover(function() {
            var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
            var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
            if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                $(this).children('.dropdown-menu').addClass('leftauto');
            } else {
                $(this).children('.dropdown-menu').removeClass('leftauto');
            }
            if ($('.dropdown', $(this)).length > 0) {
                var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                    $(this).children('.dropdown-menu').addClass('left-side');
                } else {
                    $(this).children('.dropdown-menu').removeClass('left-side');
                }
            }
        });
    }
}

/* ---------------------------------------------- /*
 * Navbar hover dropdown on desctop
 /* ---------------------------------------------- */

function hoverDropdown(width, mobileTest) {
    if ((width > 767) && (mobileTest !== true)) {
        $('.main-navigation .navbar-nav > li.dropdown, .main-navigation li.dropdown > ul > li.dropdown').removeClass('open');
        var delay = 0;
        var setTimeoutConst;
        $('.main-navigation .navbar-nav > li.dropdown, .main-navigation li.dropdown > ul > li.dropdown').hover(function() {
                var $this = $(this);
                setTimeoutConst = setTimeout(function() {
                    $this.addClass('open');
                    $this.find('.dropdown-toggle').addClass('disabled');
                }, delay);
            },
            function() {
                clearTimeout(setTimeoutConst);
                $(this).removeClass('open');
                $(this).find('.dropdown-toggle').removeClass('disabled');
            });
    } else {
        $('.main-navigation .navbar-nav > li.dropdown, .main-navigation li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
        $('.main-navigation [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().removeClass('open');
            $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
            $(this).parent().toggleClass('open');
        });
    }
}

/* ---------------------------------------------- /*
 * Navbar collapse on click
 /* ---------------------------------------------- */

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});



navbarSubmenu(width);
hoverDropdown(width, mobileTest);

$(window).resize(function() {
    var width = Math.max($(window).width(), window.innerWidth);
    hoverDropdown(width, mobileTest);
});


/*------------------------------------------
    04. Carousel For Carousel
 ------------------------------------------*/

$("#causesCarousel").owlCarousel({              
    navigation : false, // Show next and prev buttons
    slideSpeed : 100,
    paginationSpeed : 400,
    navigationText : false,
    singleItem: false,
    autoPlay: true,
    pagination: true,
    items: 3
});

/*===================================
    5.Progressbar animation
 ===================================*/

 $(document).ready(function(){
    $(".progressbars").each(function(){
        var $this = $(this);
        var inview = new Waypoint.Inview({
            element: $this,
            enter: function (direction) {
                $this.find(".progress-bar").each(function () {
                    $(this).css('width', $(this).attr("aria-valuenow") + '%');
                });
            }
        });
    });
});



/*===================================
 06.SwipeBox LightBox
 ===================================*/
;( function( $ ) {

    $( '.lightbox' ).swipebox();

} )( jQuery );


 /*==================================================
                7. Countdown
 ====================================================*/

$(document).ready(function(){
    if($(".container-countdown").length == 0) return;

    $('.container-countdown').countdown({
        date: "December 31, 2016 00:00:00",
        render: function(data) {
            var el = $(this.el);
            el.empty()
                .append("<div class='countdown-box'><span class='counter'>" + this.leadingZeros(data.days, 2) + "</span><h4>Days</h4></div>")
                .append("<div class='countdown-box'><span class='counter'>" + this.leadingZeros(data.hours, 2) + "</span><h4>Hours</h4></div>")
                .append("<div class='countdown-box'><span class='counter'>" + this.leadingZeros(data.min, 2) + "</span><h4>Minutes</h4></div>")
                .append("<div class='countdown-box'><span class='counter'>" + this.leadingZeros(data.sec, 2) + "</span><h4>Seconds</h4></div>");
        }
    });
});


/*------------------------------------------
 08. Isotope
 ------------------------------------------*/
(function(){

$(document).ready(function () {
    if($('.gallery-grid').length > 0) {

        var $galleryGrid = $('.gallery-grid');

        $galleryGrid.isotope({
            itemSelector: '.item',
        });

        /*===================================
         04. portfolio filtering
         ===================================*/
        $('.gallery-filter').on('click', 'a', function (e) {
            e.preventDefault();
            $('.gallery-filter li').removeClass('current');
            $(this).parent().addClass('current');
            var filterValue = $(this).attr('data-filter');
            $galleryGrid.isotope({ filter: filterValue });
        });
    }
});


})();

/*------------------------------------------
 09. FAQ
 ------------------------------------------*/
(function(){

    $('.faq_list .panel-title a').on('click', function(){
        $('.faq_list .panel-title a i').removeClass('fa-minus').addClass('fa-plus');

        if($(this).hasClass('collapsed')) {
            $(this).children('i').addClass('fa-minus');
        }

    });

})();


/*------------------------------------------
 10. Subscribe form ajax
 ------------------------------------------*/


$('#subscription-form').submit(function(e) {

    e.preventDefault();
    var $form           = $('#subscription-form');
    var submit          = $('#subscribe-button');
    var ajaxResponse    = $('#subscriptionResponse');
    var email           = $('#subscriber-email').val();

    $.ajax({
        type: 'POST',
        url: 'php-files/subscribe.php',
        dataType: 'json',
        data: {
            email: email
        },
        cache: false,
        beforeSend: function(result) {
            submit.html("Submitting...");
        },
        success: function(result) {
            if(result.sendstatus == 1) {
                ajaxResponse.html(result.message);
                $('#subscriber-email').val('');
                submit.html('<i class="ion-heart"></i> Get it');
            } else {
                ajaxResponse.html(result.message);
                submit.html('Try Again');
                $('#subscriber-email').val('');
            }
        },
        error: function(){
            alert('Something is wrong! Please try again')
        }
    });

});


/*===================================
 11. FlexSlider
 ===================================*/
$(window).load(function() {
    if ($('.flexslider').length == 0) return;

    $('.flexslider').flexslider({
        animation: "fade",
        pauseOnHover: true
    });
});



/*------------------------------------------
  12. Contact form
 ------------------------------------------*/

$(document).ready(function () {

    $("#contactForm").submit(function(e){

        e.preventDefault();

        var postData 		= $(this).serializeArray(),
            formURL 		= $(this).attr("action"),
            $cfResponse 	= $('#contactFormResponse'),
            $cfsubmit 		= $("#cfsubmit"),
            cfsubmitText 	= $cfsubmit.text();

        $cfsubmit.text("Sending...");


        $.ajax(
            {
                url : formURL,
                type: "POST",
                data : postData,
                success:function(data)
                {
                    $cfResponse.html(data);
                    $cfsubmit.text(cfsubmitText);
                },
                error: function(data)
                {
                    alert("Error occurd! Please try again");
                }
            });

        return false;

    });
});

/*===================================
 rotating carousel
 ===================================*/

 (function(){
     $('#dg-container').gallery();            
 })();


/*===================================
 slick slider
 ===================================*/

(function(){
   $('.slick-slider').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      prevArrow: '<i class="fa fa-chevron-left"></i>',
      nextArrow: '<i class="fa fa-chevron-right"></i>'
    });
})();

/*===================================
 nice scroll
 ===================================*/

// detect if ios or not
function iOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];

    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ return true; }
        }
    }

    return false;
}
// detect if mac or not
function isMac() {
    return navigator.platform.indexOf('Mac') > -1
}


(function(){
    if(iOS() || isMac()) {

    } else {
        jQuery.scrollSpeed(100, 800);
    }
 })();

/*===================================
 magnific popup
 ===================================*/

 $('.popup-vimeo').magnificPopup({
        type: 'iframe'
});


