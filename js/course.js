import { getOneFromDatabase } from './database-api.js';
import './header.js';
import './change-theme.js';
import { courseInfoTemplate, courseDataTemplate } from './template.js';
import {
  localStorageUserID,
  courseInfoWrapper,
  courseDataWrapper,
  courseDescriptionElem,
  headlinesWrapper,
  descriptionShadow,
  commentsWrapper,
  showAllDescriptionBtn,
  addNewCommentBtn,
  newCommentWrapper,
  newCommentTextarea,
  newCommentSubmitBtn,
  newCommentCloseBtn,
  breadcrumbCourseCategory,
  breadcrumbCourseName,
} from './dom-elements.js';

import { removeLoader, getQueryParameters, breadCrumbLinksHandler, CourseHeadlineSectionHandler, createCourseObject } from './utils.js';
import { toggleTextarea, textareaAutoResize, headlineLockSessionAlert, toggleHeadLine } from './ui-handlers.js';
import { fetchAndDisplayComments, submitNewComment } from './database-handlers.js';
import { insertToDOM, handleCommentReply, courseDiscountRemainingTimeDisplayHandler, addCourseToCartHandler } from './dom-handlers.js';

let course = null;
let courseParam = getQueryParameters('course');
let user = null;

async function fetchUser() {
  try {
    if (localStorageUserID) {
      const dbUser = await getOneFromDatabase('users', 'id', localStorageUserID);
      user = dbUser;
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
}

fetchUser();

if (!courseParam) {
  location.replace('404.html');
}

async function fetchAndDisplayCourse() {
  try {
    const course = await getOneFromDatabase('courses', 'slug', courseParam);
    if (course) {
      addCourseToDOM(course);
      courseDiscountRemainingTimeDisplayHandler(course.discount_timestamp);
    } else {
      location.replace('./404.html');
    }
  } catch (error) {
    console.error('Failed to fetch searched course', error);
  }
}

const addCourseToDOM = (dbCourse) => {
  course = createCourseObject(dbCourse);
  document.title = `${course.name} | ایزی‌لرن`;
  // breadcrumb
  breadCrumbLinksHandler(breadcrumbCourseCategory, breadcrumbCourseName, course.name, course.slug, course.category, course.categoryName, 'course');
  // Info and banner section
  insertToDOM(courseInfoWrapper, courseInfoTemplate(course));
  courseInfoWrapper.addEventListener('click', (event) => addCourseToCartHandler(event, course));
  // Data section
  insertToDOM(courseDataWrapper, courseDataTemplate(course));
  // Description section
  if (course.description) {
    insertToDOM(courseDescriptionElem, course.description);
  } else {
    courseDescriptionElem.closest('#course-description-wrapper').classList.add('hidden');
  }

  // Headline section
  let headlinesTemplate = '';
  if (course.headlines) {
    course.headlines.forEach((headline) => {
      headlinesTemplate += CourseHeadlineSectionHandler(headline, course.isPurchased, course.slug);
    });
    insertToDOM(headlinesWrapper, headlinesTemplate);
  } else {
    headlinesWrapper.parentElement.classList.add('hidden');
  }

  // comments section
  fetchAndDisplayComments(commentsWrapper, course.id);
};

fetchAndDisplayCourse();

const toggleDescription = () => {
  const descriptionToggleClasses = ['max-h-48', 'sm:max-h-80', 'md:max-h-96', 'max-h-full'];
  descriptionToggleClasses.forEach((toggleClass) => {
    courseDescriptionElem.classList.toggle(toggleClass);
  });

  showAllDescriptionBtn.children[0].classList.toggle('hidden');
  showAllDescriptionBtn.children[1].classList.toggle('hidden');
  showAllDescriptionBtn.children[2].classList.toggle('rotate-180');

  descriptionShadow.classList.toggle('hidden');
};

showAllDescriptionBtn.addEventListener('click', toggleDescription);
headlinesWrapper.addEventListener('click', toggleHeadLine);
headlinesWrapper.addEventListener('click', headlineLockSessionAlert);

addNewCommentBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea, user, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea));
newCommentSubmitBtn.addEventListener('click', () => submitNewComment(newCommentWrapper, newCommentTextarea, 'course', course.id, course.name, course.slug, user));
newCommentTextarea.addEventListener('input', textareaAutoResize);
commentsWrapper.addEventListener('click', (event) => handleCommentReply(event, 'course', course.name, course.slug, user));
window.addEventListener('load', removeLoader);
