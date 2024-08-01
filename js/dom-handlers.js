import { courseCardTemplate, blogCardTemplate, recentBlogTemplate, loginBtnTemplate } from './template.js';
import { applyDiscountToPrice, formatDate, emptyDomElemContent, getParentID, getReplyCommentWrapper, getReplyCommentTextarea } from './utils.js';
import { toggleTextarea } from './ui-handlers.js';
import { submitCommentReply } from './database-handlers.js';

// course.js - dom-handlers.js - blog.js
const insertToDOM = (domElem, content) => {
  emptyDomElemContent(domElem);
  domElem.insertAdjacentHTML('beforeend', content);
};

// header.js
const addLoginBtnToDOM = (loginButtons, userID) => {
  loginButtons.forEach((btn) => {
    insertToDOM(btn, loginBtnTemplate(userID));
  });
};

window.addCourseToCart = (id) => {
  console.log(id);
};

// index.html - course-category.html
const addCourseCardsToDOM = (courses, coursesWrapper, isSwiper = false) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-card' : 'course-card';
  let newCourse = null;
  let finalPrice = null;
  let coursesTemplate = '';
  courses.forEach((course) => {
    finalPrice = course.discount !== 100 ? applyDiscountToPrice(course.price, course.discount).toLocaleString('fa-IR') : 'رایگان!';
    newCourse = {
      id: course.id,
      name: course.name,
      caption: course.caption,
      src: course.image_src,
      teacher: course.teacher,
      students: course.students.toLocaleString('fa-IR'),
      rate: course.rate,
      discountPercent: course.discount,
      price: course.price.toLocaleString('fa-IR'),
      finalPrice: finalPrice,
      slug: course.slug,
      courseWrapperClass,
    };
    coursesTemplate += courseCardTemplate(newCourse);
  });
  insertToDOM(coursesWrapper, coursesTemplate);
};

//index.html
const addBlogCardsToDOM = (blogs, blogsWrapper) => {
  let newBlog = null;
  let blogsTemplate = '';
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: formatDate(blog.created_at),
      likes: blog.likes,
      comments: blog.comments,
      image_src: blog.image_src,
      writer: blog.writer,
      readingTime: blog.reading_time,
      subject: blog.subject,
      slug: blog.slug,
    };
    blogsTemplate += blogCardTemplate(newBlog);
  });
  insertToDOM(blogsWrapper, blogsTemplate);
};

// blog.js
const addRecentBlogsToDom = (blogs, blogsWrapper) => {
  let blogsTemplate = '';
  let newBlog = null;
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: formatDate(blog.created_at),
      slug: blog.slug,
      writer: blog.writer,
    };
    blogsTemplate += recentBlogTemplate(newBlog);
  });
  insertToDOM(blogsWrapper, blogsTemplate);
};

// comments section - course.js - blog.js
const handleReplyAndLike = (event) => {
  let commentID = null;
  let wrapper = null;
  let textarea = null;

  // open reply
  if (event.target.matches('.open-reply-btn') || event.target.closest('.open-reply-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    toggleTextarea(wrapper, textarea, true);
  }
  // Cancel Reply
  if (event.target.matches('.reply-comment-cancel-btn') || event.target.closest('.reply-comment-cancel-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    toggleTextarea(wrapper, textarea, false);
  }
  // submit reply
  if (event.target.matches('.reply-comment-submit-btn') || event.target.closest('.reply-comment-submit-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    submitCommentReply(textarea, wrapper, commentID);
  }
  // FIXME: like handle
  if (event.target.matches('.like-btn') || event.target.closest('.like-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    console.log(commentID);
  }
};

export { insertToDOM, addLoginBtnToDOM, addCourseCardsToDOM, addBlogCardsToDOM, toggleTextarea, addRecentBlogsToDom, handleReplyAndLike };
