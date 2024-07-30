import './header.js';
import './change-theme.js';
import { blogsWrapperElement, blogsSortButtons, searchBlogInput } from './dom-elements.js';
import { getAllFromDatabase } from './database-api.js';
import { removeLoader, sortArray } from './utils.js';
import { addBlogCardsToDOM } from './dom-handlers.js';
import { activeFilterBtn, removeFilterButtonsClasses } from './ui-handlers.js';

let allBlogs = [];
let sortedBLogs = [];
let searchedBlogs = [];

async function fetchAndDisplayBlogs() {
  try {
    const blogs = await getAllFromDatabase('blogs');
    allBlogs = sortArray(blogs, 'create', true);
    addBlogCardsToDOM(allBlogs, blogsWrapperElement);
  } catch (error) {
    console.error('Failed to fetch blogs', error);
  }
}
fetchAndDisplayBlogs();

const displaySortedBLogs = (type) => {
  sortedBLogs = searchedBlogs.length ? searchedBlogs : allBlogs;
  switch (type) {
    case 'latest':
      sortedBLogs = sortArray(sortedBLogs, 'create', true);
      break;
    case 'oldest':
      sortedBLogs = sortArray(sortedBLogs, 'create');
      break;
    case 'popular':
      sortedBLogs = sortArray(sortedBLogs, 'likes', true);
      break;
    case 'opinion':
      sortedBLogs = sortArray(sortedBLogs, 'comments', true);
      break;
    case 'shortest':
      sortedBLogs = sortArray(sortedBLogs, 'reading_time');
      break;
    case 'longest':
      sortedBLogs = sortArray(sortedBLogs, 'reading_time', true);
      break;
  }
  addBlogCardsToDOM(sortedBLogs, blogsWrapperElement);
};

const sortBlogs = (btn) => {
  const sortType = btn.dataset.sort;
  window.scrollY > 64 && window.scrollTo(0, 64);
  removeFilterButtonsClasses(blogsSortButtons);
  activeFilterBtn(btn);
  displaySortedBLogs(sortType);
};

const searchBlog = (event) => {
  removeFilterButtonsClasses(blogsSortButtons);
  activeFilterBtn(blogsSortButtons[0]);
  let inputValue = event.target.value;
  let regex = new RegExp(inputValue, 'gi');
  searchedBlogs = allBlogs.filter((blog) => {
    return blog.title.match(regex);
  });
  searchedBlogs = sortArray(searchedBlogs, 'create', true);
  addBlogCardsToDOM(searchedBlogs, blogsWrapperElement);
};

blogsSortButtons.forEach((btn) => {
  btn.addEventListener('click', () => sortBlogs(btn));
});

searchBlogInput.addEventListener('input', searchBlog);
window.addEventListener('load', removeLoader);
