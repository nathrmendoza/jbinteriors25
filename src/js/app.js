import $ from 'jquery';
window.$ = window.jQuery = $;

// carousel
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

Swiper.use([Autoplay, Pagination]);

// image popups
// import PhotoSwipeLightbox from 'photoswipe/lightbox';
// import 'photoswipe/style.css';

import sal from 'sal.js';
import 'sal.js/dist/sal.css';

import {jarallax} from 'jarallax';
import 'jarallax/dist/jarallax.min.css';


$(document).ready(function() {

    sal();

    jarallax($('.jarallax'), {
        speed: 0.2
    })

    var $heroSlider = [];

    $('.hero-slider').each(function(index) {
        $heroSlider[index] = new Swiper($(this)[0], {
            slidesperView: 1,
            loop: true,
            speed: 1600,
            effect: "fade",
            autoplay: {
                delay: 6000
            },
            pagination: true
        })
    })

    var $gallerySlider = [];
    var $galleryLightBox = [];

    $('.gallery-slider').each(function(index) {
        $gallerySlider[index] = new Swiper($(this)[0], {
            centeredSlides: true,
            speed: 1200,
            loop: true,
            slidesPerView: 1.25,
            spaceBetween: 16,
            autoplay: {
                delay: 3000
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                }
            }
        })
    })


    //header
    headerDynamic();
    mobileNav();

    //section scroll
    pageLoadScroll();
    anchorScroll();

})

function mobileNav() {
    var $header = $('#page-header');
    var $dropdown = $('.mob-dropdown');
    $('[data-mobile-menu-trigger]').click(function() {
        $dropdown.stop().slideToggle(400);
        if ($header.hasClass('at-top')) 
            $header.toggleClass('sticky sticky-show');
    })
}

function headerDynamic() {
    var lastScrollPos = $(window).scrollTop();
    var scrollY = $(window).scrollTop();
    var $page = $('#page-container');
    var $header = $('#page-header');
    var headerHeight = $header.outerHeight();

    var timeout;

    $(window).on('scroll', function() {
        scrollY = $(window).scrollTop();
        
        if (scrollY > headerHeight) {
            $header.addClass('sticky');
            if ($header.hasClass('at-top')) {
                timeout = setTimeout(function() {
                    $header.removeClass('at-top');
                }, 450);
            }

            if (scrollY < lastScrollPos) //scrolling up
                $header.addClass('sticky-show');
            else //scrolling down
                $header.removeClass('sticky-show');                
        
        } else if(scrollY < 1) {
            $header.removeClass('sticky');
            $header.removeClass('sticky-show');
            
            clearTimeout(timeout);
            $header.addClass('at-top');
        }

        lastScrollPos = $(window).scrollTop();
    })

}

function scrollTo(sectionId) {
    var topOffset = 125;
    var $targetSection = $(`[data-section-id="${sectionId}"]`);

    if ($targetSection.length > 0) {
        var targetOffset = $targetSection.offset().top - topOffset;
        $('html, body').animate({
            scrollTop: targetOffset
        }, 800, 'swing', function() {
            if (history.pushState) {
                history.pushState(null, null, '/?scroll=' + sectionId);
            }
        })

        return true;
    }

    return false;
}

function anchorScroll() {
    var $header = $('#page-header');
    var $dropdown = $('.mob-dropdown');

    $('a[href*="?scroll="]').click(function(e) {
        e.preventDefault();

        var href = $(this).attr('href');
        var match = href.match(/\?scroll=([^&]*)/);
        
        if (match && match[1]) {
            var sectionId = match[1];
            scrollTo(sectionId);
            
            $dropdown.stop().slideUp(400);
        }

    });
}

function pageLoadScroll() {
    var urlParams = new URLSearchParams(window.location.search);
    var scrollParam = urlParams.get('scroll');

    if (scrollParam) {
        setTimeout(function() {
            scrollTo(scrollParam);
        }, 100);
    }
}