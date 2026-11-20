// Swiper sliders: event banner (autoplay with pause) and book list
(() => {
  const { $, prefersReducedMotion } = window.App;

  // Keep off-screen slides out of the tab order and reading order
  const syncInert = (swiper, visibleClass) => {
    swiper.slides.forEach((slide) => {
      slide.inert = !slide.classList.contains(visibleClass);
    });
  };

  const initBanner = () => {
    const root = $('#bannerSlider');
    const toggle = $('#bannerToggle');
    let playing = !prefersReducedMotion;

    const swiper = new Swiper($('.swiper', root), {
      rewind: true,
      speed: 600,
      autoplay: playing ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false,
      pagination: { el: $('.banner__pagination', root), clickable: true, bulletElement: 'button' },
      navigation: { prevEl: $('.banner__nav--prev', root), nextEl: $('.banner__nav--next', root) },
      a11y: {
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        paginationBulletMessage: '{{index}}번 배너로 이동',
        prevSlideMessage: '이전 배너',
        nextSlideMessage: '다음 배너',
        containerMessage: null,
        containerRoleDescriptionMessage: null
      },
      on: {
        init: (s) => syncInert(s, 'swiper-slide-active'),
        slideChange: (s) => syncInert(s, 'swiper-slide-active')
      }
    });

    const render = () => {
      root.classList.toggle('is-paused', !playing);
      toggle.setAttribute('aria-label', playing ? '자동 재생 정지' : '자동 재생 시작');
    };

    toggle.addEventListener('click', () => {
      playing = !playing;
      if (playing) swiper.autoplay.start();
      else swiper.autoplay.stop();
      render();
    });

    // Pause while a control inside has keyboard focus
    root.addEventListener('focusin', () => swiper.autoplay.running && swiper.autoplay.pause());
    render();
  };

  const initBooks = () => {
    const root = $('#bookSlider');

    new Swiper($('.swiper', root), {
      spaceBetween: 16,
      slidesPerView: 1.15,
      watchSlidesProgress: true,
      navigation: { prevEl: $('#bookPrev'), nextEl: $('#bookNext'), disabledClass: 'is-disabled' },
      breakpoints: {
        621: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3, spaceBetween: 20 }
      },
      a11y: {
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        prevSlideMessage: '이전 도서',
        nextSlideMessage: '다음 도서',
        containerMessage: null,
        containerRoleDescriptionMessage: null
      },
      on: {
        init: (s) => syncInert(s, 'swiper-slide-visible'),
        progress: (s) => syncInert(s, 'swiper-slide-visible'),
        resize: (s) => syncInert(s, 'swiper-slide-visible')
      }
    });
  };

  window.App.initCarousel = () => {
    initBanner();
    initBooks();
  };
})();
