import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import './hero.js';
import './testimonials.js';
import { getAllFromDatabase } from './api.js';
import { removeLoader, addCoursesToDOM, formatDate } from './shared.js';
import { blogCardTemplate } from './template.js';
import { latestCoursesWrapperElement, popularCoursesWrapperElement, blogsWrapperElement } from './domElements.js';

getAllFromDatabase('courses')
  .then((courses) => {
    const LastTenCourses = courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
    const twelveMostPopularCourses = courses.sort((a, b) => b.students - a.students).slice(0, 12);
    addCoursesToDOM(LastTenCourses, latestCoursesWrapperElement);
    addCoursesToDOM(twelveMostPopularCourses, popularCoursesWrapperElement, true);
  })
  .catch((error) => console.log(error));

// Add blogs to dom
const addBlogsToDom = (blogs, blogsWrapper) => {
  blogsWrapper.innerHTML = '';
  let newBlog = null;
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: formatDate(blog.created_at),
      likes: blog.likes,
      comments: blog.comments,
      src: blog.src,
      writer: blog.writer,
      readingTime: blog.reading_time,
      subject: blog.subject,
    };
    blogsWrapper.insertAdjacentHTML('beforeend', blogCardTemplate(newBlog));
  });
};

getAllFromDatabase('blogs').then((blogs) => {
  const lastFourBlog = blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  addBlogsToDom(lastFourBlog, blogsWrapperElement);
});

// Popular Courses Swiper
const swiper = new Swiper('.popular-courses-swiper', {
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
