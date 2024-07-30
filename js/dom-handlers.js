import { courseCardTemplate, blogCardTemplate } from './template.js';
import { applyDiscountToPrice, formatDate, insertToDom } from './utils.js';
import { toggleTextarea } from './ui-handlers.js';

window.addCourseToCart = (id) => {
  console.log(id);
};

// index.html - course-category.html
const addCourseCardsToDOM = (courses, coursesWrapper, isSwiper = false) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-card' : 'course-card';
  let newCourse = null;
  let finalPrice = null;
  let coursesHtml = '';
  courses.forEach((course) => {
    finalPrice = course.discount !== 100 ? applyDiscountToPrice(course.price, course.discount).toLocaleString('fa-IR') : 'رایگان!';
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
    coursesHtml += courseCardTemplate(newCourse);
  });
  insertToDom(coursesWrapper, coursesHtml);
};

//index.html
const addBlogCardsToDOM = (blogs, blogsWrapper) => {
  let newBlog = null;
  let blogsHtml = '';
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: formatDate(blog.created_at),
      likes: blog.likes,
      comments: blog.comments,
      src: blog.image_src,
      writer: blog.writer,
      readingTime: blog.reading_time,
      subject: blog.subject,
      slug: blog.slug,
    };
    blogsHtml += blogCardTemplate(newBlog);
  });
  insertToDom(blogsWrapper, blogsHtml);
};

export { addCourseCardsToDOM, addBlogCardsToDOM, toggleTextarea };
