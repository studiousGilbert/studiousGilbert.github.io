/*------------------------------------------------------------------
[Table of contents]

    - main js

- Project:    Chris - HTML Template
- Version:    1.0
- Author:     Andrey Sokoltsov
- Profile:    http://themeforest.net/user/andreysokoltsov
--*/

/* main js */
$(document).ready(function () {

    'use strict';

    function preload() {
        var $preloader = $('#page-preloader'),
            $spinner = $preloader.find('.spinner-loader');
        $( window ).on('load', function() {
            $spinner.fadeOut();
            $preloader.delay(500).fadeOut('slow');
        });


    }
    preload();


    //fixed header
    function fixedHeader(wSc) {
        if(wSc > 10){
            $('.header').addClass('active');
        }else{
            $('.header').removeClass('active');
        }
    }
    $(window).on('scroll', function () {
        var wSc = $(window).scrollTop();
        fixedHeader(wSc);
    });
    $(window).load(function () {
        $(window).trigger('scroll');
    });


    //change lang cookie
    function readCookie(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++){
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function setLang() {
        var cookieLang = readCookie('lang');
        if(cookieLang){
            $('.change-lng ul li a').each(function () {
                if($(this).text() == cookieLang){
                    $(this).parent('li').addClass('active');
                }
            });
        }else{
            document.cookie = 'lang=' + $('.change-lng ul li:first a').text();
            $('.header .change-lng ul li:first').addClass('active');
            $('.mob-menu-wrapper .change-lng ul li:first').addClass('active');
        }
    }
    setLang();
    $('.change-lng ul li a').on('click', function (event) {
        event.preventDefault();
        document.cookie = 'lang=' + $(this).text();
        window.location = 'index.html';
    });


    //init audiojungle
    /*
    function playerWidth() {
        var playerWidth = $('.tab-content').width();
        if(playerWidth < 380){
            playerWidth = 380;
        }
        initAudioJunglePlayer(playerWidth);
    }
    playerWidth();
    $('a[href*="#envato"]').on('click', function () {
        playerWidth();
    });
    var width = $(window).width();
    $(window).resize(function(){
        if($(window).width() != width){
            playerWidth();
            width = $(window).width();
        }
    });
    function initAudioJunglePlayer(width) {
        var client = new EnvatoPlayerClient({
            id: "player_div", // this identifies the container element for the player
            volume: 25, // this is a percent value (0 to 100)
            autoStart: false, // tells the player to auto play music
            referralId: "", // the referral id for affiliate marketting
            limit: 15, // limits the number of tracks in the playlist
            width: width, // player width
            backColor: "#ffffff", // contrasting color
            foreColor: "#ffc107", // less contrasting color
            source: "random-new-files:audiojungle" // playlist source
        });
    }
    */


    //open google map in new window
    $('.map-link').on('click', function (event) {
        event.preventDefault();
        window.open('https://www.google.com.ua/maps/place/' + $(this).text(), '_blank');
    });


    //scroll to anchor
    if($('header').is('.header-home')){
        $('.main-menu ul li a[href*="#"], .mobile-menu ul li a[href*="#"], .first-screen-buttons a[href*="#"]').on('click', function(event){
            event.preventDefault();
            var anchor = $(this).attr('href');
            if($(anchor).position()){
                $('html, body').stop().animate({
                    scrollTop: $(anchor).offset().top - 80
                }, 800);
            }
        });
    }


    //open bootstrap modal from modal
    $(document).on('hidden.bs.modal', '.modal', function () {
        if($('.modal:visible').length){
            $(document.body).addClass('modal-open');
            $(document.body).css({paddingRight: scrollWidth()});
            $('header').css('padding-right', scrollWidth());
        }else {
            $(document.body).css({paddingRight: 0});
            $('header').css({paddingRight: 0});
        }
    });


    //bootstrap modal fix for fixed header
    function scrollWidth() {
        var div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        var paddingRight = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return paddingRight;
    }
    $('.modal').on('show.bs.modal', function () {
        $('header').css('padding-right', scrollWidth());
    });
    $('.modal').on('hidden.bs.modal', function () {
        $('.header').css('padding-right', '0');
    });


    //mobile-menu
    $('.mobile-btn, .close-mob-menu').on('click', function () {
        $('.mob-menu-wrapper').toggleClass('active');
    });
    $('.mobile-menu ul li a').on('click', function () {
        $('.mob-menu-wrapper').removeClass('active');
    });


    //init youtube/vimeo slider
    $('.tab-content .tab-pane').each(function () {
        if(!($(this).hasClass('init-slider'))){
            $(this).addClass('init-slider');
        }else{
            initVideoSlider($(this));
        }
    });
    function initVideoSlider(target) {
        if(target.hasClass('init-slider')){
            target.find('.owl-carousel').owlCarousel({
                margin:5,
                loop:true,
                autoWidth:true,
                items:4,
                dots: false,
                video:true
            });
            target.removeClass('init-slider');
        }
    }
    //Placed the slider twice to initiate it in the beginning.
    $('.tab-content .tab-pane').each(function () {
        if(!($(this).hasClass('init-slider'))){
            $(this).addClass('init-slider');
        }else{
            initVideoSlider($(this));
        }
    });
    $('.tabs-buttons ul li a').on('click', function () {
        var _this = $(this);
        setTimeout(function () {
            initVideoSlider($(_this.attr('href')));
        }, 160);
    });


    //play video
    $(document).on('click', '.slider-item', function () {
        if($(this).parents('.tab-pane').attr('id') == 'youtube'){
            var mainVideoLink = $(this).parents('.owl-carousel').prev('.video-box').find('iframe').attr('src');
            var videoCode = mainVideoLink.replace('https://www.youtube.com/embed/', '');

            var videoLink = $(this).find('a.owl-video').attr('href');
            $(this).parents('.tab-pane#youtube').find('.video-box iframe').attr('src', videoLink);

            $(this).find('.owl-video-tn').css('background-image', 'url(https://img.youtube.com/vi/' + videoCode + '/hqdefault.jpg)');
            $(this).find('.owl-video').attr('href', mainVideoLink);
        }else if($(this).parents('.tab-pane').attr('id') == 'vimeo'){
            var mainVideoLink = $(this).parents('.owl-carousel').prev('.video-box').find('iframe').attr('src');
            var videoCode = mainVideoLink.replace('https://player.vimeo.com/video/', '');
            videoCode = parseInt(videoCode, 10);

            var videoLink = $(this).find('a.owl-video').attr('href').replace('https://vimeo.com/', '');
            $(this).parents('.tab-pane#vimeo').find('.video-box iframe').attr('src', 'https://player.vimeo.com/video/' + videoLink + '?color=ffc107&title=0&byline=0&portrait=0');

            var bgBox = $(this).find('.owl-video-tn');

            $.ajax({
                type:'GET',
                url: 'http://vimeo.com/api/v2/video/' + videoCode + '.json',
                jsonp: 'callback',
                dataType: 'jsonp',
                success: function(data){
                    var thumbnail_src = data[0].thumbnail_large;
                    $('#thumb_wrapper').append('<img src="' + thumbnail_src + '"/>');
                    bgBox.css('background-image', 'url(' + thumbnail_src + ')');
                }
            });

            $(this).find('.owl-video').attr('href', 'https://vimeo.com/' + videoCode);
        }
    });


});