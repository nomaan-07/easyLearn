import './change-theme.js';
import './header.js';
import './aos.initialize.js';
import './hero.js';
import './testimonials.js';
import { removeLoader, getAllFromDataBase } from './shared.js';

const latestCoursesWrapperElement = document.querySelector('.latest-courses-wrapper');
const popularCoursesWrapperElement = document.querySelector('.popular-courses-wrapper');

window.addCourseToCart = (id) => {
  console.log(id);
};

const courseTemplate = (id, name, description, src, teacher, students, rate, price, discountPercent, finalPrice, courseWrapperClass) => {
  let finalPriceTemplate = null;
  if (discountPercent === 100) {
    finalPriceTemplate = `
          <div class="flex items-end">
              <span class="text-green-600 dark:text-green-400">${finalPrice}</span>
            </div>`;
  } else {
    finalPriceTemplate = `
          <div class="flex items-end">
              <span class="text-green-600 dark:text-green-400">${finalPrice}</span>
              <svg class="size-7 mr-[-3px]">
                <use href="#toman"></use>
              </svg>
            </div>`;
  }
  const courseTemplate = `            
                <!-- Course -->
            <div class="${courseWrapperClass} group">
              <!-- Course Banner -->
              <div class="h-40 rounded-b-2xl overflow-hidden">
                <a class="size-full" href="./course.html">
                  <img class="size-full object-cover" src="${src}" alt="${name}" />
                </a>
                <!-- Discount Percent -->
                <div class="absolute top-3 left-0 flex items-end justify-center w-10 h-6 theme-bg-color text-white rounded-r-full">${discountPercent}%</div>
              </div>
              <!-- End of Course Banner -->
              <div class="h-[122px] px-4 space-y-2 mt-4">
                <!-- Course Name -->
                <a class="block font-VazirBold text-lg max-h-[60px] hover:theme-text-color transition-all line-clamp-2" href="./course.html">${name}</a>
                <!-- Course Description -->
                <p class="line-clamp-2 font-VazirLight max-h-12">${description}</p>
              </div>
              <!-- Course Teacher -->
              <a class="flex justify-center bg-slate-100 dark:bg-slate-700 md:hover:bg-slate-200 dark:md:hover:bg-slate-600 absolute left-0 right-0 bottom-[86px] mx-auto w-48 py-2 rounded-full transition-colors" href="./teacher.html">${teacher}</a>
              <!-- Students && Rating && Price  -->
              <div class="flex items-end justify-between px-4 pt-8 mt-8 border-t border-t-slate-200 dark:border-t-slate-700">
                <!-- Students && Rating  -->
                <div>
                  <!-- Students -->
                  <div class="flex gap-1 mb-0.5">
                    <svg class="size-5 theme-text-color">
                      <use href="#user-group"></use>
                    </svg>
                    <span>${students}</span>
                  </div>
                  <!-- End of Students -->
                  <!-- Rating -->
                  <div class="flex gap-1">
                    <svg class="size-5 text-yellow-500">
                      <use href="#star"></use>
                    </svg>
                    <span>${rate}</span>
                  </div>
                  <!-- End of Rating -->
                </div>
                <!-- End of Students && Rating  -->
                <!-- Course Price -->
                <div>
                  <!-- Price -->
                  <span class="text-sm line-through dark:text-slate-200 decoration-red-400">${price}</span>
                  <!-- Final Price -->
                    ${finalPriceTemplate}
                </div>
                <!-- End of Course Price -->
              </div>
              <!-- End of Students && Rating && Price  -->
              <!-- Cart Btn -->
              <div class="absolute mx-auto left-0 right-0 bottom-2 lg:-bottom-10 lg:group-hover:bottom-2 flex items-center justify-center w-10 h-10 theme-bg-color hover:theme-hover-bg-color text-white rounded-full transition-all md:cursor-pointer" onclick="addCourseToCart('${id}')">
                <svg class="size-6">
                  <use href="#shopping-bag"></use>
                </svg>
              </div>
              <!-- End of Course -->
            </div>`;
  return courseTemplate;
};

const getFinalPrice = (price, discount) => {
  return discount === 100 ? 'رایگان' : (price * (100 - discount)) / 100;
};

const addCoursesToDOM = (courses, courseWrapper, isSwiper) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-cart' : 'course-cart';
  courseWrapper.innerHTML = '';
  let finalPrice = null;
  courses.forEach((course) => {
    finalPrice = getFinalPrice(course.price, course.discount);
    courseWrapper.insertAdjacentHTML('beforeend', courseTemplate(course.id, course.name, course.description, course.src, course.teacher, course.students, course.rate, course.price, course.discount, finalPrice, courseWrapperClass));
  });
};

getAllFromDataBase('courses')
  .then((courses) => {
    const LastTenCourses = courses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
    const twelveMostPopularCourses = courses.sort((a, b) => b.students - a.students).slice(0, 12);
    addCoursesToDOM(LastTenCourses, latestCoursesWrapperElement, false);
    addCoursesToDOM(twelveMostPopularCourses, popularCoursesWrapperElement, true);
  })
  .catch((error) => console.log(error));

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
