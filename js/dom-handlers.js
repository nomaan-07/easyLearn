import { courseCardTemplate, blogCardTemplate, headlineTemplate, CourseHeadlineSessionTemplate, commentTemplate, commentReplyTemplate } from './template.js';
import { applyDiscountToPrice, formatDate, categoryInPersian } from './utils.js';
import { textareaAutoResize, toggleTextarea } from './ui-handlers.js';

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

//index.html
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

// course.js
const breadCrumbLinksHandler = (categoryElement, nameElement, name, slug, category, page) => {
  const categoryName = categoryInPersian(category);
  categoryElement.innerText = categoryName;
  categoryElement.href = `./${page}-category.html?category=${category}`;
  nameElement.innerText = name;
  nameElement.href = `./${page}.html?course=${slug}`;
};

// course.js
const CourseHeadlineSectionHandler = (headline) => {
  let sessions = headline.sessions;
  let sessionsTemplate = '';
  if (sessions.length) {
    sessions.forEach((session, index) => {
      sessionsTemplate += CourseHeadlineSessionTemplate(session, index + 1);
    });
  }
  return headlineTemplate(headline, sessionsTemplate, sessions.length);
};

// course.js
const CourseCommentSectionHandler = (comment) => {
  let replies = comment.replies;
  let repliesTemplate = '';
  if (replies) {
    replies.forEach((reply) => {
      if (reply.confirmed) {
        repliesTemplate += commentReplyTemplate(reply);
      }
    });
  }
  return commentTemplate(comment, repliesTemplate);
};

export { addCoursesToDOM, addBlogsToDom, breadCrumbLinksHandler, CourseHeadlineSectionHandler, CourseCommentSectionHandler, toggleTextarea };
