import { removeLoader, getAllFromDatabase, getFinalPrice, formatDate } from './shared.js';
import './header.js';
import './change-theme.js';
import { courseInfoTemplate, courseDataTemplate } from './template.js';

const courseInfoWrapper = document.querySelector('#course-info');
const courseDataWrapper = document.querySelector('#course-data-wrapper');
const courseDescription = document.querySelector('.course-description');
const descriptionShadow = document.querySelector('.course-description-shadow ');
const showAllDescriptionBtn = document.querySelector('#course-show-all-description-btn');
const headlinesTitleElem = document.querySelectorAll('.headline__title');
const addNewCommentBtn = document.querySelector('.new-comment-btn');
const newCommentWrapper = document.querySelector('.new-comment-wrapper');
const newCommentTextarea = document.querySelector('#new-comment-textarea');
const allTextareaElements = document.querySelectorAll('textarea');
const newCommentSubmitBtn = document.querySelector('#new-comment-submit-btn');
const newCommentCloseBtn = document.querySelector('#new-comment-cancel-btn');
const likeButtons = document.querySelectorAll('.like-btn');
const openResponseButtons = document.querySelectorAll('.open-response-btn');
const closeResponseBtn = document.querySelectorAll('.response-comment-cancel-btn');
const responseCommentWrappers = document.querySelectorAll('.response-comment-wrapper');
const responseCommentSubmitButtons = document.querySelectorAll('.response-comment-submit-btn');

let courseSearchParam = new URLSearchParams(location.search).get('course');

if (!courseSearchParam) {
  location.replace('404.html');
}

const addCourseDetailToDOM = (courseObject) => {
  courseInfoWrapper.innerHTML = '';
  courseDataWrapper.innerHTML = '';
  courseDescription.innerHTML = '';
  let course = {
    finalPrice: courseObject.discount !== 100 ? getFinalPrice(courseObject.price, courseObject.discount).toLocaleString('fa-IR') : 'رایگان',
    id: courseObject.id,
    name: courseObject.name,
    description: courseObject.description,
    src: courseObject.src,
    teacher: courseObject.teacher,
    students: courseObject.students.toLocaleString('fa-IR'),
    ratePercent: Math.floor((courseObject.rate * 100) / 5),
    discountPercent: courseObject.discount,
    price: courseObject.price.toLocaleString('fa-IR'),
    content: courseObject.content,
    // FIXME: update date
    date: formatDate(courseObject.created_at),
    // FIXME
    sessionsCount: null,
    videosLength: null,
    situation: null,
  };
  document.title = `${course.name} | ایزی‌لرن`;

  courseInfoWrapper.insertAdjacentHTML('beforeend', courseInfoTemplate(course));
  courseDataWrapper.insertAdjacentHTML('beforeend', courseDataTemplate(course));
  if (course.content.length) {
    courseDescription.insertAdjacentHTML('beforeend', course.content);
  } else {
    courseDescription.closest('#course-description-wrapper').classList.add('hidden');
  }
};

getAllFromDatabase('courses').then((courses) => {
  let filterCourse = courses.filter((courseObject) => {
    return courseObject.slug === courseSearchParam;
  });

  !filterCourse.length ? location.replace('404.html') : addCourseDetailToDOM(filterCourse[0]);
});

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

const getCommentID = (el) => {
  const comment = el.closest('.comment');
  const commentID = comment.getAttribute('id');
  return commentID;
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

// FIXME: Send Comment ot database
const submitComment = (textarea, wrapper) => {
  const comment = textarea.value.trim();
  toggleTextarea();
  // TODO: modal comment submit
};

const textareaAutoResize = (event) => {
  event.target.style.height = '160px';
  event.target.style.height = `${event.target.scrollHeight}px`;
};

const addLike = (svg, el, count) => {
  svg.innerHTML = '<use href="#heart"></use>';
  el.innerText = count + 1;
};

const reduceLike = (svg, el, count) => {
  svg.innerHTML = '<use href="#heart-outline"></use>';
  el.innerText = count - 1;
};

// FIXME: add to database instead of localStorage
const toggleLike = (btn, isLoading = false) => {
  const commentID = getCommentID(btn);
  const isLiked = localStorage.getItem(`isLiked-${commentID}`) === 'true';
  const likeElem = btn.children[1];
  const svg = btn.children[0];
  const likeCount = Number(likeElem.innerText);
  if (isLoading) {
    isLiked ? addLike(svg, likeElem, likeCount) : null;
  } else {
    if (isLiked) {
      localStorage.setItem(`isLiked-${commentID}`, false);
      reduceLike(svg, likeElem, likeCount);
    } else {
      localStorage.setItem(`isLiked-${commentID}`, true);
      addLike(svg, likeElem, likeCount);
    }
  }
};

headlinesTitleElem.forEach((titleElem) =>
  titleElem.addEventListener('click', () => {
    toggleHeadLine(titleElem);
  })
);

likeButtons.forEach((btn) => {
  toggleLike(btn, true);
});

likeButtons.forEach((btn) => btn.addEventListener('click', () => toggleLike(btn)));

addNewCommentBtn.addEventListener('click', () => toggleTextarea(false, true));
openResponseButtons.forEach((btn) => btn.addEventListener('click', () => toggleTextarea(btn, true)));
closeResponseBtn.forEach((btn) => btn.addEventListener('click', () => toggleTextarea(btn)));
allTextareaElements.forEach((el) => el.addEventListener('input', textareaAutoResize));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea());
newCommentSubmitBtn.addEventListener('click', () => submitComment(newCommentTextarea, newCommentWrapper));

showAllDescriptionBtn.addEventListener('click', toggleDescription);
window.addEventListener('load', removeLoader);
