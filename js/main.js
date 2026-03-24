/**
 * INFINOX KOREA - Main JavaScript (jQuery)
 * Rebuilt interactions for the cloned website
 */

$(document).ready(function () {

  /* ===================================
     STICKY HEADER
     =================================== */
  function handleScroll() {
    if ($(window).scrollTop() > 50) {
      $('#site-header').addClass('scrolled');
    } else {
      $('#site-header').removeClass('scrolled');
    }
  }

  $(window).on('scroll', handleScroll);
  handleScroll(); // Run on load

  /* ===================================
     MOBILE MENU
     =================================== */
  $('.mobile-menu-btn').on('click', function () {
    $(this).toggleClass('active');
    $('#mobile-nav').toggleClass('open');

    // Animate hamburger bars
    if ($(this).hasClass('active')) {
      $(this).find('span:nth-child(1)').css({
        'transform': 'translateY(7px) rotate(45deg)'
      });
      $(this).find('span:nth-child(2)').css({
        'opacity': '0'
      });
      $(this).find('span:nth-child(3)').css({
        'transform': 'translateY(-7px) rotate(-45deg)'
      });
    } else {
      $(this).find('span').css({
        'transform': '',
        'opacity': ''
      });
    }
  });

  // Close mobile menu when clicking a link
  $('#mobile-nav a').on('click', function () {
    $('#mobile-nav').removeClass('open');
    $('.mobile-menu-btn').removeClass('active').find('span').css({
      'transform': '',
      'opacity': ''
    });
  });

  /* ===================================
     SCROLL ANIMATIONS (Fade-in on viewport)
     =================================== */
  function checkAnimations() {
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    $('.fade-in, .fade-in-left, .fade-in-right').each(function () {
      var elementTop = $(this).offset().top;
      var triggerPoint = scrollTop + windowHeight - 80;

      if (elementTop < triggerPoint) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', checkAnimations);
  // Trigger on load
  setTimeout(checkAnimations, 100);

  /* ===================================
     SLIDER / CAROUSEL
     =================================== */
  function initSlider(sliderEl) {
    var $slider = $(sliderEl);
    var $track = $slider.find('.slider-track');
    var $slides = $track.find('.slide');
    var $dots = $slider.find('.slider-dot');
    var $prevBtn = $slider.find('.slider-arrow.prev');
    var $nextBtn = $slider.find('.slider-arrow.next');
    var totalSlides = $slides.length;
    var currentIndex = 0;
    var autoPlayInterval;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      $track.css('transform', 'translateX(' + (-100 * currentIndex) + '%)');
      $dots.removeClass('active').eq(currentIndex).addClass('active');
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, 4000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    $dots.on('click', function () {
      goToSlide($(this).index());
      stopAutoPlay();
      startAutoPlay();
    });

    $prevBtn.on('click', function () {
      goToSlide(currentIndex - 1);
      stopAutoPlay();
      startAutoPlay();
    });

    $nextBtn.on('click', function () {
      goToSlide(currentIndex + 1);
      stopAutoPlay();
      startAutoPlay();
    });

    // Touch support
    var touchStartX = 0;
    $track[0].addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    $track[0].addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
    }, { passive: true });

    // Init
    goToSlide(0);
    if (totalSlides > 1) startAutoPlay();
  }

  // Initialize all sliders
  $('.slider-wrapper').each(function () {
    initSlider(this);
  });

  /* ===================================
     SMOOTH SCROLL for anchor links
     =================================== */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 60
      }, 600, 'swing');
    }
  });

  /* ===================================
     COUNTER ANIMATION
     =================================== */
  function animateCounters() {
    $('.counter-num').each(function () {
      var $this = $(this);
      if ($this.hasClass('counted')) return;

      var elementTop = $this.offset().top;
      var triggerPoint = $(window).scrollTop() + $(window).height() - 60;

      if (elementTop < triggerPoint) {
        $this.addClass('counted');
        var target = parseInt($this.data('target'), 10);
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;

        var timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          $this.text(Math.floor(current).toLocaleString());
        }, 16);
      }
    });
  }

  $(window).on('scroll', animateCounters);
  animateCounters();

  /* ===================================
     HOVER EFFECTS for product cards
     =================================== */
  $('.product-card').on('mouseenter', function () {
    $(this).stop(true).find('h3').css('color', '#FFCE32');
  }).on('mouseleave', function () {
    $(this).stop(true).find('h3').css('color', '#000');
  });

  /* ===================================
     BUTTON RIPPLE EFFECT (Gỡ bỏ để giống gốc)
     =================================== */
  // Removed


  /* ===================================
     FORM SUBMISSION
     =================================== */
  $('.contact-form form').on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $btn = $form.find('[type="submit"]');
    $btn.text('전송 중...').prop('disabled', true);

    // Simulate submission
    setTimeout(function () {
      $form[0].reset();
      $btn.text('전송 완료!');
      setTimeout(function () {
        $btn.text('문의하기').prop('disabled', false);
      }, 3000);
    }, 1500);
  });

  /* ===================================
     ACTIVE NAV LINK
     =================================== */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.site-nav a, #mobile-nav a').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

});
