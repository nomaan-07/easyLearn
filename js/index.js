import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import { heroParticlesJS } from './particles-initialize.js';
import { heroTypewriter } from './typewriter-initialize.js';
import { getAllFromDatabase } from './database-api.js';
import { addCoursesToDOM, addBlogsToDom } from './dom-handlers.js';
import { blogCardTemplate } from './template.js';
import { latestCoursesWrapperElement, popularCoursesWrapperElement, blogsWrapperElement } from './dom-elements.js';
import { removeLoader, formatDate } from './utils.js';

// hero Section animations
heroParticlesJS();
heroTypewriter();

getAllFromDatabase('courses')
  .then((courses) => {
    const LastTenCourses = courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
    const twelveMostPopularCourses = courses.sort((a, b) => b.students - a.students).slice(0, 12);
    addCoursesToDOM(LastTenCourses, latestCoursesWrapperElement);
    addCoursesToDOM(twelveMostPopularCourses, popularCoursesWrapperElement, true);
  })
  .catch((error) => console.log(error));

getAllFromDatabase('blogs').then((blogs) => {
  const lastFourBlog = blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  addBlogsToDom(lastFourBlog, blogsWrapperElement);
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
