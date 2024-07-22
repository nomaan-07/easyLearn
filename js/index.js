import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import './hero.js';
import './testimonials.js';
import { removeLoader, getAllFromDatabase, getFinalPrice } from './shared.js';

const latestCoursesWrapperElement = document.querySelector('.latest-courses-wrapper');
const popularCoursesWrapperElement = document.querySelector('.popular-courses-wrapper');
const blogsWrapperElement = document.querySelector('.blogs-wrapper');

const formattedDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return `${year}/${month}/${day}`;
};

window.addCourseToCart = (id) => {
  console.log(id);
};

// Add courses to DOM
const courseTemplate = (course) => {
  let finalPriceTemplate = null;
  if (course.discountPercent === 100) {
    finalPriceTemplate = `
          <div class="text-left">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
            </div>`;
  } else {
    finalPriceTemplate = `
          <div class="flex items-end">
              <span class="text-green-600 dark:text-green-400">${course.finalPrice}</span>
              <svg class="size-7 mr-[-3px]">
                <use href="#toman"></use>
              </svg>
            </div>`;
  }
  const courseTemplateHtml = `            
                <!-- Course -->
            <div class="${course.courseWrapperClass} group">
              <!-- Course Banner -->
              <div class="h-40 rounded-b-2xl overflow-hidden">
                <a class="size-full" href="./course.html">
                  <img class="size-full object-cover" loading="lazy" src="${course.src}" alt="${course.name}" />
                </a>
                <!-- Discount Percent -->
                <div class="absolute top-3 left-0 flex items-end justify-center w-10 h-6 theme-bg-color text-white rounded-r-full">${course.discountPercent}%</div>
              </div>
              <!-- End of Course Banner -->
              <div class="h-[122px] px-4 space-y-2 mt-4">
                <!-- Course Name -->
                <a class="block font-VazirBold text-lg max-h-[60px] hover:theme-text-color transition-all line-clamp-2" href="./course.html">${course.name}</a>
                <!-- Course Description -->
                <p class="line-clamp-2 font-VazirLight max-h-12">${course.description}</p>
              </div>
              <!-- Course Teacher -->
              <a class="flex justify-center bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 absolute left-0 right-0 bottom-[86px] mx-auto w-48 py-2 rounded-full transition-colors" href="./teacher.html">${course.teacher}</a>
              <!-- Students && Rating && Price  -->
              <div class="flex items-end justify-between px-4 pt-8 mt-8 border-t border-t-slate-200 dark:border-t-slate-700">
                <!-- Students && Rating  -->
                <div>
                  <!-- Students -->
                  <div class="flex gap-1 mb-0.5">
                    <svg class="size-5 theme-text-color">
                      <use href="#user-group"></use>
                    </svg>
                    <span>${course.students}</span>
                  </div>
                  <!-- End of Students -->
                  <!-- Rating -->
                  <div class="flex gap-1">
                    <svg class="size-5 text-yellow-500">
                      <use href="#star"></use>
                    </svg>
                    <span>${course.rate}</span>
                  </div>
                  <!-- End of Rating -->
                </div>
                <!-- End of Students && Rating  -->
                <!-- Course Price -->
                <div>
                  <!-- Price -->
                  <span class="text-sm line-through dark:text-slate-200 decoration-red-400">${course.price}</span>
                  <!-- Final Price -->
                    ${finalPriceTemplate}
                </div>
                <!-- End of Course Price -->
              </div>
              <!-- End of Students && Rating && Price  -->
              <!-- Cart Btn -->
              <div class="absolute mx-auto left-0 right-0 bottom-2 lg:-bottom-10 lg:group-hover:bottom-2 flex items-center justify-center w-10 h-10 theme-bg-color hover:theme-hover-bg-color text-white rounded-full transition-all md:cursor-pointer" onclick="addCourseToCart('${course.id}')">
                <svg class="size-6">
                  <use href="#shopping-bag"></use>
                </svg>
              </div>
              <!-- End of Course -->
            </div>`;
  return courseTemplateHtml;
};

const addCoursesToDOM = (courses, coursesWrapper, isSwiper) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-cart' : 'course-cart';
  coursesWrapper.innerHTML = '';
  let newCourse = null;
  courses.forEach((course) => {
    newCourse = {
      id: course.id,
      name: course.name,
      description: course.description,
      src: course.src,
      teacher: course.teacher,
      students: course.students,
      rate: course.rate,
      discountPercent: course.discount,
      price: course.price.toLocaleString('en-US'),
      finalPrice: getFinalPrice(course.price, course.discount),
      courseWrapperClass,
    };
    coursesWrapper.insertAdjacentHTML('beforeend', courseTemplate(newCourse));
  });
};

getAllFromDatabase('courses')
  .then((courses) => {
    const LastTenCourses = courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
    const twelveMostPopularCourses = courses.sort((a, b) => b.students - a.students).slice(0, 12);
    addCoursesToDOM(LastTenCourses, latestCoursesWrapperElement, false);
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
                <a href="./blogs" class="flex justify-center theme-text-color bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 py-0.5 px-2 rounded-full transition-colors">${blog.category}</a>
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
      date: formattedDate(blog.created_at),
      likes: blog.likes,
      comments: blog.comments,
      src: blog.src,
      writer: blog.writer,
      readingTime: blog.reading_time,
      category: blog.category,
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
