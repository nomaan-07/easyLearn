import swiperHandler from './swiper.initialize.js';

swiperHandler('.testimonials-swiper', {
  effect: 'creative',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,

  creativeEffect: {
    next: {
      shadow: false,
      translate: ['-110%', 0, -100],
    },
    prev: {
      shadow: false,
      translate: ['110%', 0, -100],
    },
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
      creativeEffect: {
        limitProgress: 20,
      },
    },
    1280: {
      slidesPerView: 4,
      creativeEffect: {
        limitProgress: 20,
      },
    },
    1536: {
      slidesPerView: 5,
      creativeEffect: {
        limitProgress: 20,
      },
    },
  },

  navigation: {
    nextEl: '.testimonials-swiper-next-btn',
    prevEl: '.testimonials-swiper-prev-btn',
  },
});
