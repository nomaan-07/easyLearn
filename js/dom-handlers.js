import { courseCardTemplate } from './template.js';
import { applyDiscountToPrice } from './utils.js';

window.addCourseToCart = (id) => {
  console.log(id);
};

// index.html - course-category.html
const addCoursesToDOM = (courses, coursesWrapper, isSwiper = false) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-card' : 'course-card';
  coursesWrapper.innerHTML = '';
  let newCourse = null;
  let finalPrice = null;
  courses.forEach((course) => {
    finalPrice = course.discount !== 100 ? applyDiscountToPrice(course.price, course.discount).toLocaleString('fa-IR') : 'رایگان';
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

export { addCoursesToDOM };
