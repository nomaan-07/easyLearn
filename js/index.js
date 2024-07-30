import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import { heroParticlesJS } from './particles-initialize.js';
import { heroTypewriter } from './typewriter-initialize.js';
import { getAllFromDatabase } from './database-api.js';
import { addCourseCardsToDOM, addBlogCardsToDOM } from './dom-handlers.js';
import { latestCoursesWrapperElement, popularCoursesWrapperElement, lastBlogsWrapperElement } from './dom-elements.js';
import { removeLoader, sortArray } from './utils.js';

// hero Section animations
heroParticlesJS();
heroTypewriter();

getAllFromDatabase('courses')
  .then((courses) => {
    const LastTenCourses = sortArray(courses, 'create', true).slice(0, 10);
    const twelveMostPopularCourses = sortArray(courses, 'students', true).slice(0, 12);
    addCourseCardsToDOM(LastTenCourses, latestCoursesWrapperElement);
    addCourseCardsToDOM(twelveMostPopularCourses, popularCoursesWrapperElement, true);
  })
  .catch((error) => console.log(error));

getAllFromDatabase('blogs').then((blogs) => {
  const lastFourBlog = sortArray(blogs, 'create', true).slice(0, 5);
  addBlogCardsToDOM(lastFourBlog, lastBlogsWrapperElement);
});

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
