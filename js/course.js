import { getAllFromDatabase, getOneFromDatabase } from './database-api.js';
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

import { removeLoader, getQueryParameters, applyDiscountToPrice, formatDate, breadCrumbLinksHandler, CourseHeadlineSectionHandler, categoryInPersian } from './utils.js';
import { toggleTextarea, textareaAutoResize } from './ui-handlers.js';
import { fetchAndDisplayComments, submitCommentReply, submitNewComment } from './database-handlers.js';
import { insertToDOM, handleCommentReply } from './dom-handlers.js';

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
    course ? addCourseToDOM(course) : location.replace('./404.html');
  } catch (error) {
    console.error('Failed to fetch searched course', error);
  }
}

const createCourseObject = (dbCourse) => ({
  finalPrice: dbCourse.discount !== 100 ? applyDiscountToPrice(dbCourse.price, dbCourse.discount).toLocaleString('fa-IR') : 'رایگان!',
  id: dbCourse.id,
  name: dbCourse.name,
  caption: dbCourse.caption,
  image_src: dbCourse.image_src,
  teacher: dbCourse.teacher,
  students: dbCourse.students.toLocaleString('fa-IR'),
  ratePercent: Math.floor((dbCourse.rate * 100) / 5),
  discountPercent: dbCourse.discount,
  price: dbCourse.price.toLocaleString('fa-IR'),
  description: dbCourse.description,
  category: dbCourse.category[0],
  categoryName: categoryInPersian(dbCourse.category[0]),
  slug: dbCourse.slug,
  headlines: dbCourse.headlines,
  sessionsCount: dbCourse.sessions_count,
  videosLength: dbCourse.videos_length,
  situation: dbCourse.complete ? 'تکمیل' : 'درحال برگزاری',
  // FIXME: updated_at instead of created_at
  date: formatDate(dbCourse.created_at),
});

const addCourseToDOM = (dbCourse) => {
  course = createCourseObject(dbCourse);
  document.title = `${course.name} | ایزی‌لرن`;
  // breadcrumb
  breadCrumbLinksHandler(breadcrumbCourseCategory, breadcrumbCourseName, course.name, course.slug, course.category, course.categoryName, 'course');
  // Info and banner section
  insertToDOM(courseInfoWrapper, courseInfoTemplate(course));
  // Data section
  insertToDOM(courseDataWrapper, courseDataTemplate(course));
  // Description section
  if (course.description) {
    insertToDOM(courseDescriptionElem, course.description);
  } else {
    courseDescriptionElem.closest('#course-description-wrapper').classList.add('hidden');
  }

  // Headline section
  let headlines = '';
  if (course.headlines) {
    course.headlines.forEach((headline) => {
      headlines += CourseHeadlineSectionHandler(headline);
    });
    insertToDOM(headlinesWrapper, headlines);
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

const toggleHeadLine = (event) => {
  if (event.target.matches('.headline__title') || event.target.closest('.headline__title')) {
    let titleElem = event.target;
    if (!event.target.matches('.headline__title')) {
      titleElem = event.target.closest('.headline__title');
    }

    let titleELemToggleClasses = ['theme-bg-color', 'text-white', 'bg-slate-100', 'dark:bg-slate-700', 'md:hover:theme-text-color'];
    let totalHeadlineBodyHeight = 0;

    const headlineBody = titleElem.nextElementSibling;
    const headLineChildren = headlineBody.children;

    titleELemToggleClasses.forEach((toggleClass) => titleElem.classList.toggle(toggleClass));

    // Headline Chevron left icon
    titleElem.children[1].children[1].classList.toggle('-rotate-90');

    for (const child of headLineChildren) {
      totalHeadlineBodyHeight += child.offsetHeight;
    }

    if (headlineBody.offsetHeight === 0) {
      headlineBody.style.maxHeight = `${totalHeadlineBodyHeight}px`;
    } else {
      headlineBody.style.maxHeight = '0px';
    }
  }
};

showAllDescriptionBtn.addEventListener('click', toggleDescription);
headlinesWrapper.addEventListener('click', toggleHeadLine);
window.addEventListener('load', removeLoader);

addNewCommentBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea, user, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea));
newCommentSubmitBtn.addEventListener('click', () => submitNewComment(newCommentWrapper, newCommentTextarea, course.id, course.name, user));
newCommentTextarea.addEventListener('input', textareaAutoResize);
commentsWrapper.addEventListener('click', (event) => handleCommentReply(event, user));
