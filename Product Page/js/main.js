(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // International Tour carousel
    $(".InternationalTour-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : false,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // packages carousel
    $(".packages-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });
    $(".citytour_carousel").owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:3,
                nav:false,
                dots:true
            },
            450:{
                items:4,
                nav:false,
                dots:true
            },
            575:{
                items:4,
                nav:false,
                dots:true,
            },
            600:{
                items:4,
                nav:true,
                dots:false,
            },
            768:{
                items:5
            },
            1000:{
                items:7
            }
        }
    });


    $(".cstm-nav_carousel").owlCarousel({
        loop:false,
        margin:10,
        autoWidth:true,
        autoplay:false,
        nav:false,
        dots:false,
        center:false,
        responsive:{
            0:{
                items:6,
                nav:true,
            },
            767:{
                items:6,
                nav:true,
            },
            768:{
                items:4
            },
            1000:{
                items:4
            }
        }
    });
    $(".product_carousel").owlCarousel({
        loop:true,
        // margin:10,
        nav:true,
        dots:true,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });



    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    }); 

})(jQuery);


/*Scroll Js */

$(document).ready(function() {

    // Owl Carousel buttons / items click smooth scroll
    $('.cstm-nav_carousel .item a').on('click', function(e) {
        var target = $(this).attr('href');

        // agar external link hoga to scroll nahi karega
        if (target.startsWith('#')) {
            e.preventDefault();

            var targetEl = $(target);

            if (targetEl.length) {
                $('html, body').animate({
                    scrollTop: targetEl.offset().top - 20
                }, 1200);
            }
        }
    });

    // URL me hash ho to page load par scroll
    var hash = window.location.hash;
    if (hash && $(hash).length) {
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 20
        }, 1200);
    }

});
