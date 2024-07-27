import { getAllFromDatabase, getOneFromDatabase } from './api.js';
import './header.js';
import './change-theme.js';
import { courseInfoTemplate, courseDataTemplate, headlineTemplate, headlineSessionTemplate, commentTemplate, commentReplyTemplate } from './template.js';
import {
  breadcrumbCourseCategory,
  breadcrumbCourseName,
  courseInfoWrapper,
  courseDataWrapper,
  courseDescription,
  headlinesWrapper,
  descriptionShadow,
  commentsWrapper,
  showAllDescriptionBtn,
  addNewCommentBtn,
  newCommentWrapper,
  newCommentTextarea,
  newCommentSubmitBtn,
  newCommentCloseBtn,
  responseCommentWrappers,
  responseCommentSubmitButtons,
} from './dom-elements.js';

import { removeLoader, getCommentID, getQueryParameters, applyDiscountToPrice, formatDate, categoryInPersian } from './utils.js';
import { toggleLike } from './ui-handlers.js';

let courseSearchParam = getQueryParameters('course');

if (!courseSearchParam) {
  location.replace('404.html');
}

const breadCrumbLinksHandler = (name, slug, category) => {
  const categoryName = categoryInPersian(category);
  breadcrumbCourseCategory.innerText = categoryName;
  breadcrumbCourseCategory.href = `./course-category.html?category=${category}`;
  breadcrumbCourseName.innerText = name;
  breadcrumbCourseName.href = `./course.html?course=${slug}`;
};

const headlineSectionHandler = (headline) => {
  let sessions = headline.sessions;
  let sessionsTemplate = '';
  if (sessions.length) {
    sessions.forEach((session, index) => {
      sessionsTemplate += headlineSessionTemplate(session, index + 1);
    });
  }
  return headlineTemplate(headline, sessionsTemplate, sessions.length);
};

const commentSectionHandler = (comment) => {
  let replies = comment.replies;
  let repliesTemplate = '';
  if (replies) {
    replies.forEach((reply) => {
      repliesTemplate += commentReplyTemplate(reply);
    });
  }
  return commentTemplate(comment, repliesTemplate);
};

const addCourseDetailToDOM = (courseObject) => {
  courseDescription.innerHTML = '';
  let course = {
    finalPrice: courseObject.discount !== 100 ? applyDiscountToPrice(courseObject.price, courseObject.discount).toLocaleString('fa-IR') : 'رایگان',
    id: courseObject.id,
    name: courseObject.name,
    caption: courseObject.caption,
    src: courseObject.src,
    teacher: courseObject.teacher,
    students: courseObject.students.toLocaleString('fa-IR'),
    ratePercent: Math.floor((courseObject.rate * 100) / 5),
    discountPercent: courseObject.discount,
    price: courseObject.price.toLocaleString('fa-IR'),
    description: courseObject.description,
    category: courseObject.category[0],
    slug: courseObject.slug,
    headlines: courseObject.headlines,
    sessionsCount: courseObject.sessions_count,
    videosLength: courseObject.videos_length,
    situation: courseObject.complete ? 'تکمیل' : 'درحال برگزاری',
    // FIXME: updated_at instead of created_at
    date: formatDate(courseObject.created_at),
  };
  document.title = `${course.name} | ایزی‌لرن`;
  // breadcrumb
  breadCrumbLinksHandler(course.name, course.slug, course.category);
  // Info and banner section
  courseInfoWrapper.innerHTML = '';
  courseInfoWrapper.insertAdjacentHTML('beforeend', courseInfoTemplate(course));
  // Data section
  courseDataWrapper.innerHTML = '';
  courseDataWrapper.insertAdjacentHTML('beforeend', courseDataTemplate(course));

  // Description section
  courseDescription.innerHTML = '';
  if (course.description) {
    courseDescription.insertAdjacentHTML('beforeend', course.description);
  } else {
    courseDescription.closest('#course-description-wrapper').classList.add('hidden');
  }

  // Headline section
  headlinesWrapper.innerHTML = '';
  if (course.headlines) {
    course.headlines.forEach((headline) => {
      headlinesWrapper.insertAdjacentHTML('beforeend', headlineSectionHandler(headline));
    });
    const headlinesTitleElem = document.querySelectorAll('.headline__title');
    headlinesTitleElem.forEach((titleElem) =>
      titleElem.addEventListener('click', () => {
        toggleHeadLine(titleElem);
      })
    );
  } else {
    headlinesWrapper.parentElement.classList.add('hidden');
  }

  // comments section
  getAllFromDatabase('comments').then((comments) => {
    commentsWrapper.innerHTML = '';
    let FilteredComments = comments.filter((comment) => {
      return comment.course_id === course.id;
    });
    if (FilteredComments.length) {
      FilteredComments.forEach((comment) => {
        commentsWrapper.insertAdjacentHTML('beforeend', commentSectionHandler(comment));
      });
      handleReplyAndLikes();
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
    courseDescription.classList.toggle(toggleClass);
  });

  showAllDescriptionBtn.children[0].classList.toggle('hidden');
  showAllDescriptionBtn.children[1].classList.toggle('hidden');
  showAllDescriptionBtn.children[2].classList.toggle('rotate-180');

  descriptionShadow.classList.toggle('hidden');
};

// toggle headline
const toggleHeadLine = (titleElem) => {
  let totalHeadlineBodyHeight = 0;

  const headlineBody = titleElem.nextElementSibling;
  const headLineChildren = headlineBody.children;

  titleElem.classList.toggle('theme-bg-color');
  titleElem.classList.toggle('text-white');
  titleElem.classList.toggle('bg-slate-100');
  titleElem.classList.toggle('dark:bg-slate-700');
  titleElem.classList.toggle('md:hover:theme-text-color');
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
};

const toggleTextarea = (btn = false, openTextarea = false) => {
  let wrapper = newCommentWrapper;
  let textarea = newCommentTextarea;
  if (btn) {
    const commentID = getCommentID(btn);
    wrapper = document.querySelector(`#response-wrapper-${commentID}`);
    textarea = document.querySelector(`#response-textarea-${commentID}`);
  }

  if (openTextarea) {
    wrapper.classList.remove('max-h-0');
    wrapper.classList.remove('overflow-hidden');
    textarea.focus();
  } else {
    textarea.value = '';
    wrapper.classList.add('max-h-0');
    wrapper.classList.add('overflow-hidden');
  }
};

// FIXME: Send Comment to database
const submitComment = (textarea, wrapper) => {
  const comment = textarea.value.trim();
  toggleTextarea();
  // TODO: modal comment submit
};

const textareaAutoResize = (event) => {
  event.target.style.height = '160px';
  event.target.style.height = `${event.target.scrollHeight}px`;
};

const handleReplyAndLikes = () => {
  const likeButtons = document.querySelectorAll('.like-btn');
  const openResponseButtons = document.querySelectorAll('.open-response-btn');
  const allCommentsTextareaElements = document.querySelectorAll('.response-comment-textarea');
  const closeResponseButtons = document.querySelectorAll('.response-comment-cancel-btn');

  likeButtons.forEach((btn) => {
    toggleLike(btn, true);
  });
  likeButtons.forEach((btn) => btn.addEventListener('click', () => toggleLike(btn)));
  openResponseButtons.forEach((btn) => btn.addEventListener('click', () => toggleTextarea(btn, true)));
  closeResponseButtons.forEach((btn) => btn.addEventListener('click', () => toggleTextarea(btn)));
  allCommentsTextareaElements.forEach((el) => el.addEventListener('input', textareaAutoResize));
};

addNewCommentBtn.addEventListener('click', () => toggleTextarea(false, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea());
newCommentSubmitBtn.addEventListener('click', () => submitComment(newCommentTextarea, newCommentWrapper));

newCommentTextarea.addEventListener('input', textareaAutoResize);
showAllDescriptionBtn.addEventListener('click', toggleDescription);
window.addEventListener('load', removeLoader);
