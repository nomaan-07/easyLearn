import { removeLoader } from './shared.js';
import './header.js';
import './change-theme.js';

const headlinesTitleElem = document.querySelectorAll('.headline__title');

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

  if (headlineBody.offsetHeight === totalHeadlineBodyHeight) {
    headlineBody.style.maxHeight = '0px';
  } else {
    headlineBody.style.maxHeight = `${totalHeadlineBodyHeight}px`;
  }
};

headlinesTitleElem.forEach((titleElem) =>
  titleElem.addEventListener('click', () => {
    toggleHeadLine(titleElem);
  })
);

window.addEventListener('load', removeLoader);
