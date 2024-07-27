import { courseCardTemplate } from './template.js';

const removeLoader = () => {
  document.body.classList.remove('h-0');
  document.body.classList.remove('overflow-y-hidden');
  document.querySelector('.loader-wrapper').classList.add('hide');
};

const getFinalPrice = (price, discount) => {
  return discount === 100 ? 0 : (price * (100 - discount)) / 100;
};

window.addCourseToCart = (id) => {
  console.log(id);
};

// Add courses to DOM
const addCoursesToDOM = (courses, coursesWrapper, isSwiper = false) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-card' : 'course-card';
  coursesWrapper.innerHTML = '';
  let newCourse = null;
  let finalPrice = null;
  courses.forEach((course) => {
    finalPrice = course.discount !== 100 ? getFinalPrice(course.price, course.discount).toLocaleString('fa-IR') : 'رایگان';
    newCourse = {
      id: course.id,
      name: course.name,
      caption: course.caption,
      src: course.src,
      teacher: course.teacher,
      students: course.students.toLocaleString('fa-IR'),
      rate: course.rate,
      discountPercent: course.discount,
      price: course.price.toLocaleString('fa-IR'),
      finalPrice: finalPrice,
      slug: course.slug,
      courseWrapperClass,
    };
    coursesWrapper.insertAdjacentHTML('beforeend', courseCardTemplate(newCourse));
  });
};

const formatDate = (date) => {
  const dateList = new Date(date).toLocaleDateString('fa-IR').split('/');
  const year = dateList[0];
  const month = dateList[1].padStart(2, '۰');
  const day = dateList[2].padStart(2, '۰');
  return `${year}/${month}/${day}`;
};

const categoryPersianEquivalent = (category) => {
  let categoryPersian = null;
  switch (category) {
    case 'python':
      categoryPersian = 'پایتون';
      break;
    case 'hack':
      categoryPersian = 'امنیت';
      break;
    case 'front-end':
      categoryPersian = 'فرانت اند';
      break;
    case 'soft-skill':
      categoryPersian = 'مهارت های نرم';
      break;
    case 'all-courses':
      categoryPersian = 'دوره ها';
      break;
    case 'popular-courses':
      categoryPersian = 'دوره های محبوب';
      break;
  }
  return categoryPersian;
};

export { removeLoader, getFinalPrice, addCoursesToDOM, formatDate, categoryPersianEquivalent };
