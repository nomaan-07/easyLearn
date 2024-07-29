import { getParentID } from './utils.js';

const updateLike = (isLiked, svg, likeElem, count) => {
  if (isLiked) {
    svg.innerHTML = '<use href="#heart"></use>';
    likeElem.innerText = count + 1;
  } else {
    svg.innerHTML = '<use href="#heart-outline"></use>';
    likeElem.innerText = count ? count - 1 : count;
  }
};
// course.js
// FIXME: add to database instead of localStorage
const toggleLike = (btn, isLoading = false) => {
  const commentID = getParentID(btn, 'comment');
  const isLiked = localStorage.getItem(`isLiked-${commentID}`) === 'true';
  const likeElem = btn.children[1];
  const svg = btn.children[0];
  const likeCount = Number(likeElem.innerText);
  if (isLoading) {
    updateLike(isLiked, svg, likeElem, likeCount);
  } else {
    localStorage.setItem(`isLiked-${commentID}`, !isLiked);
    updateLike(!isLiked, svg, likeElem, likeCount);
  }
};

// course.js - dom-handlers.js
const textareaAutoResize = (event) => {
  event.target.style.height = '160px';
  event.target.style.height = `${event.target.scrollHeight}px`;
};

// course.js - domHandler.js
const toggleTextarea = (wrapper, textarea, openTextarea = false) => {
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

// course-category.js - blogs.js
function activeFilterBtn(btn) {
  btn.classList.add('theme-bg-color-10');
  btn.classList.add('theme-text-color');
  btn.children[0].classList.add('theme-bg-color');
  btn.children[0].classList.remove('bg-slate-200');
  btn.children[0].classList.remove('dark:bg-slate-500');
}

// course-category.js - blogs.js
const removeFilterButtonsClasses = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.remove('theme-bg-color-10');
    btn.classList.remove('theme-text-color');
    btn.children[0].classList.remove('theme-bg-color');
    btn.children[0].classList.add('bg-slate-200');
    btn.children[0].classList.add('dark:bg-slate-500');
  });
};

export { toggleLike, textareaAutoResize, toggleTextarea, activeFilterBtn, removeFilterButtonsClasses };
