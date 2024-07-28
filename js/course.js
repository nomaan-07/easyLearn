import { getAllFromDatabase, getOneFromDatabase } from './database-api.js';
import './header.js';
import './change-theme.js';
import { courseInfoTemplate, courseDataTemplate } from './template.js';
import {
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

import { removeLoader, getQueryParameters, applyDiscountToPrice, formatDate, getParentID, getReplyCommentWrapper, getReplyCommentTextarea, insertToDom, breadCrumbLinksHandler, CourseHeadlineSectionHandler, CourseCommentSectionHandler } from './utils.js';
import { toggleLike, toggleTextarea, textareaAutoResize } from './ui-handlers.js';
import { submitCommentReply, submitNewComment } from './database-handlers.js';

let course = null;
let courseSearchParam = getQueryParameters('course');

if (!courseSearchParam) {
  location.replace('404.html');
}

const courseObject = (dbCourse) => {
  const course = {
    finalPrice: dbCourse.discount !== 100 ? applyDiscountToPrice(dbCourse.price, dbCourse.discount).toLocaleString('fa-IR') : 'رایگان!',
    id: dbCourse.id,
    name: dbCourse.name,
    caption: dbCourse.caption,
    src: dbCourse.src,
    teacher: dbCourse.teacher,
    students: dbCourse.students.toLocaleString('fa-IR'),
    ratePercent: Math.floor((dbCourse.rate * 100) / 5),
    discountPercent: dbCourse.discount,
    price: dbCourse.price.toLocaleString('fa-IR'),
    description: dbCourse.description,
    category: dbCourse.category[0],
    slug: dbCourse.slug,
    headlines: dbCourse.headlines,
    sessionsCount: dbCourse.sessions_count,
    videosLength: dbCourse.videos_length,
    situation: dbCourse.complete ? 'تکمیل' : 'درحال برگزاری',
    // FIXME: updated_at instead of created_at
    date: formatDate(dbCourse.created_at),
  };
  return course;
};

const addCourseDetailToDOM = (dbCourse) => {
  course = courseObject(dbCourse);
  document.title = `${course.name} | ایزی‌لرن`;
  // breadcrumb
  breadCrumbLinksHandler(breadcrumbCourseCategory, breadcrumbCourseName, course.name, course.slug, course.category, 'course');
  // Info and banner section
  insertToDom(courseInfoWrapper, courseInfoTemplate(course));
  // Data section
  insertToDom(courseDataWrapper, courseDataTemplate(course));
  // Description section
  if (course.description) {
    insertToDom(courseDescriptionElem, course.description);
  } else {
    courseDescriptionElem.closest('#course-description-wrapper').classList.add('hidden');
  }

  // Headline section
  let headlines = '';
  if (course.headlines) {
    course.headlines.forEach((headline) => {
      headlines += CourseHeadlineSectionHandler(headline);
    });
    insertToDom(headlinesWrapper, headlines);
  } else {
    headlinesWrapper.parentElement.classList.add('hidden');
  }

  // comments section
  getAllFromDatabase('comments').then((comments) => {
    let commentsElements = '';
    let FilteredComments = comments.filter((comment) => {
      return comment.page_id === course.id && comment.confirmed;
    });
    if (FilteredComments.length) {
      FilteredComments.forEach((comment) => {
        commentsElements += CourseCommentSectionHandler(comment);
      });
      insertToDom(commentsWrapper, commentsElements);
    } else {
      commentsWrapper.innerHTML = `<p class="p-4 font-VazirMedium sm:text-lg xl:text-xl">هنوز نظری برای این بخش ثبت نشده است.</p>`;
    }
  });
};

getOneFromDatabase('courses', 'slug', courseSearchParam)
  .then((course) => {
    addCourseDetailToDOM(course);
  })
  .catch(() => location.replace('404.html'));

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

// const handleLike = () => {
//   const likeButtons = document.querySelectorAll('.like-btn');

//   likeButtons.forEach((btn) => {
//     toggleLike(btn, true);
//   });
//   likeButtons.forEach((btn) => btn.addEventListener('click', () => toggleLike(btn)));
// };

const handleReplyAndLike = (event) => {
  let commentID = null;
  let wrapper = null;
  let textarea = null;
  let openReplyBtn = null;
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
    textarea.value = '';
  }
  // submit reply
  if (event.target.matches('.reply-comment-submit-btn') || event.target.closest('.reply-comment-submit-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    submitCommentReply(textarea, commentID);
    toggleTextarea(wrapper, textarea, false);
    textarea.value = '';
  }
  // like handle
  if (event.target.matches('.like-btn') || event.target.closest('.like-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    console.log(commentID);
  }
};

showAllDescriptionBtn.addEventListener('click', toggleDescription);
addNewCommentBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea));
newCommentSubmitBtn.addEventListener('click', () => submitNewComment(newCommentWrapper, newCommentTextarea, course.id, course.name));
newCommentTextarea.addEventListener('input', textareaAutoResize);
headlinesWrapper.addEventListener('click', toggleHeadLine);
commentsWrapper.addEventListener('click', handleReplyAndLike);
window.addEventListener('load', removeLoader);
