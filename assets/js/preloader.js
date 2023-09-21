// Check if jQuery is defined
if (typeof jQuery !== 'undefined') {
    // jQuery is loaded, you can use it here
    // For example:
    jQuery(document).ready(function($) {
        // Your jQuery code here
    });
} else {
    // jQuery is not loaded
    console.log('jQuery is not loaded.');
}


jQuery(document).ready(function($) {
    const $h1 = $('h1')
    $h1.css('color', 'red');
    $(function() {
        let $sitePreloader = $('#site-preloader');
        let $firstSlide = $sitePreloader.find('.slide--first');
        let $secondSlide = $sitePreloader.find('.slide--second');
        let $secondSlideTextContent = $secondSlide.find('.preloader--conten-text');
        let $secondSlidepreloaderHeartlogo = $secondSlide.find('.preloader-heart-logo');
        let $secondSlideVideo = $secondSlide.find('.vid-container');
        let $videoContainer = $sitePreloader.find('.vid-container');
        const heartIcon = document.querySelector('.preloader-heart-logo');
        const scaleAnimation = [{ transform: 'scale(0.6)' }, { transform: 'scale(0.5)' }, { transform: 'scale(0.6)' }];
        const scaleEffect = new KeyframeEffect(heartIcon, scaleAnimation, { duration: 2000, iterations: Infinity });
        const scaleAnimationPlayer = new Animation(scaleEffect, document.timeline);

        function disableScroll() {
            // Get the current page scroll position
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

                // if any scroll is attempted, set this to the previous value
                window.onscroll = function() {
                    window.scrollTo(scrollLeft, scrollTop);
                };
        }

        function enableScroll() {
            window.onscroll = function() {};
        }

        function showFirstSlide() {
            disableScroll();
            $firstSlide.fadeIn(300, function() {
                setTimeout(function() {
                    $firstSlide.fadeOut(300, function() {
                        showSecondSlide();
                    });
                }, 1500);
            });
        }

        function showSecondSlide() {
            $secondSlidepreloaderHeartlogo.addClass('heart-logo-animation')
            $secondSlide.fadeIn(300, function() {
                $secondSlide.css('z-index', '9');
                hideTextContent();
            });
        }

        function hideTextContent() {
            setTimeout(function() {
                $secondSlideTextContent.fadeOut(100, function() {
                    $secondSlideTextContent.hide();
                    playVideo($videoContainer);
                    showVideo();

                });
            }, 1500);
        }

        function showVideo() {
            $secondSlidepreloaderHeartlogo.css('z-index', '10');
            // $secondSlidepreloaderHeartlogo.removeClass('heart-logo-animation');
            $secondSlidepreloaderHeartlogo.addClass('heart-icon-filter');
            scaleAnimationPlayer.play();
            $secondSlideVideo.css('opacity', '1');
            $secondSlideVideo.css('display', 'block');
            setTimeout(function() {
                $secondSlideVideo.fadeIn(100, function() {
                    $secondSlideVideo.css('z-index', '1');
                    setTimeout(function() {
                        hideSecondSlide();
                    }, 3000);
                });
            }, 1500);
        }

        function hideSecondSlide() {
            $secondSlide.fadeOut(500, function() {
                hidePreloader();
                enableScroll();
            });
        }

        function hidePreloader() {
            $sitePreloader.hide();
            Cookies.set('eh_preloader_disabled', 'true');
        }

        showFirstSlide();
    });

    function playVideo($videoContainer) {
        const $videoPlayer = $videoContainer.siblings('.vid-container').find('video, iframe');
        if ($videoContainer.siblings('.vid-container').hasClass('callable')) {
            return;
        }
        setTimeout(function() {
            $videoContainer.parent().addClass('playing');
        }, 100);
        if ($videoPlayer.is('video')) {
            $videoPlayer[0].play();
        } else if ($videoPlayer.is('iframe')) {
            $videoPlayer.attr('src', $videoPlayer[0].src + '?autoplay=1');
        }
    };
});



