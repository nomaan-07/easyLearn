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
export { toggleLike, textareaAutoResize, toggleTextarea };
