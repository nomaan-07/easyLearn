import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import { heroParticlesJS } from './particles-initialize.js';
import { heroTypewriter } from './typewriter-initialize.js';
import { removeLoader, deleteUserIDFromLocal } from './utils.js';
import { fetchAndDisplayMainPageCourses, fetchAndDisplayMainPageBlogs } from './database-handlers.js';
import { localStorageUserID } from './dom-elements.js';

deleteUserIDFromLocal(localStorageUserID);

// hero Section animations
heroParticlesJS();
heroTypewriter();

// display courses and blogs
fetchAndDisplayMainPageCourses();
fetchAndDisplayMainPageBlogs();

// TestimonialSwiper
const testimonialSwiper = new Swiper('.testimonials-swiper', {
  effect: 'creative',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,

  creativeEffect: {
    next: {
      shadow: false,
      translate: ['-110%', 0, -100],
      opacity: 0.8,
    },
    prev: {
      shadow: false,
      translate: ['110%', 0, -100],
      opacity: 0.8,
    },
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
      // spaceBetween: 10,
      creativeEffect: {
        limitProgress: 2,
      },
    },
    1280: {
      slidesPerView: 4,
      creativeEffect: {
        limitProgress: 3,
      },
    },
    1536: {
      slidesPerView: 5,
      creativeEffect: {
        limitProgress: 4,
      },
    },
  },

  navigation: {
    nextEl: '.testimonials-swiper-next-btn',
    prevEl: '.testimonials-swiper-prev-btn',
  },
});

// Popular Courses Swiper
const popularCourse = new Swiper('.popular-courses-swiper', {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 4000,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 24,

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
    1536: {
      slidesPerView: 5,
    },
  },

  navigation: {
    nextEl: '.popular-courses-swiper-next-btn',
    prevEl: '.popular-courses-swiper-prev-btn',
  },
});

window.addEventListener('load', removeLoader);
