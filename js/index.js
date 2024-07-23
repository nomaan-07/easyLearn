import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import './hero.js';
import './testimonials.js';
import { removeLoader, getAllFromDatabase, addCoursesToDOM } from './shared.js';

const latestCoursesWrapperElement = document.querySelector('.latest-courses-wrapper');
const popularCoursesWrapperElement = document.querySelector('.popular-courses-wrapper');
const blogsWrapperElement = document.querySelector('.blogs-wrapper');

getAllFromDatabase('courses')
  .then((courses) => {
    const LastTenCourses = courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
    const twelveMostPopularCourses = courses.sort((a, b) => b.students - a.students).slice(0, 12);
    addCoursesToDOM(LastTenCourses, latestCoursesWrapperElement);
    addCoursesToDOM(twelveMostPopularCourses, popularCoursesWrapperElement, true);
  })
  .catch((error) => console.log(error));

// Add blogs to dom
const blogTemplate = (blog) => {
  const template = `
              <!-- Blog -->
            <div class="p-4 bg-white dark:bg-slate-800 shadow rounded-2xl group relative overflow-hidden">
              <!-- Blog Banner -->
              <a href="./blog.html" class="block w-full h-44 rounded-2xl overflow-hidden relative">
                <img class="size-full object-cover" loading="lazy" src="${blog.src}" alt="${blog.title}" />
                <svg class="hidden md:block absolute size-full inset-0 theme-bg-color text-white p-3 opacity-80 group-hover:opacity-0 group-hover:translate-y-44 duration-500 rounded-2xl transition-all">
                  <use href="#logo"></use>
                </svg>
              </a>
              <!-- End of Blag Banner -->
              <!-- Blog Title -->
              <a class="block font-VazirBold text-lg h-[60px] hover:theme-text-color transition-all line-clamp-2 mt-4" href="./blog.html">${blog.title}</a>
              <!-- End of Blog Title -->
              <!-- Writer and Category -->
              <div class="flex items-center justify-between gap-2 font-VazirBold text-xs border-t border-t-slate-200 dark:border-t-slate-700 mt-4 pt-4">
                <!-- Writer -->
                <div class="flex items-center gap-1">
                  <svg class="size-4 theme-text-color">
                    <use href="#pencil-square"></use>
                  </svg>
                  <span>${blog.writer}</span>
                </div>
                <!-- Category -->
                <a href="./blogs" class="flex justify-center theme-text-color bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 py-0.5 px-2 rounded-full transition-colors">${blog.subject}</a>
              </div>
              <!-- End of Writer and Category -->
              <!-- Likes & Comments && Time -->
              <div class="flex items-center justify-between gap-2 font-VazirBold text-xs my-4">
                <!-- Likes and Comments -->
                <div class="flex items-center gap-2">
                  <!-- Likes -->
                  <div class="flex items-center gap-1">
                    <svg class="size-4 text-rose-500">
                      <use href="#heart"></use>
                    </svg>
                    <span>${blog.likes}</span>
                  </div>
                  <!-- Comments -->
                  <div class="flex items-center gap-1">
                    <svg class="size-4 theme-text-color">
                      <use href="#chat-bubble-left-ellipsis"></use>
                    </svg>
                    <span>${blog.comments}</span>
                  </div>
                </div>
                <!-- Time -->
                <div href="./blogs" class="flex items-center gap-1">
                  <svg class="size-4 theme-text-color">
                    <use href="#timer"></use>
                  </svg>
                  <span>زمان مطالعه: <span>${blog.readingTime}</span> دقیقه</span>
                </div>
              </div>
              <!-- End of Likes & Comments && Time -->
              <!-- Date -->
              <div href="./blogs" class="flex items-center gap-1 font-VazirBold text-xs">
                <svg class="size-4 theme-text-color">
                  <use href="#calendar-days"></use>
                </svg>
                <span>${blog.date}</span>
              </div>
              <!-- End of Date -->
              <!-- Blog Link-->
              <a class="blog-cart-link group/btn" href="./blog.html">
                <span class="transition-colors">مطالعه مقاله</span>
                <svg class="size-4 md:absolute md:left-4 md:group-hover/btn:left-1 transition-all">
                  <use href="#left-arrow"></use>
                </svg>
              </a>
            </div>`;
  return template;
};

const addBlogsToDom = (blogs, blogsWrapper) => {
  blogsWrapper.innerHTML = '';
  let newBlog = null;
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: new Date(blog.created_at).toLocaleDateString('fa-IR'),
      likes: blog.likes,
      comments: blog.comments,
      src: blog.src,
      writer: blog.writer,
      readingTime: blog.reading_time,
      subject: blog.subject,
    };
    blogsWrapper.insertAdjacentHTML('beforeend', blogTemplate(newBlog));
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
