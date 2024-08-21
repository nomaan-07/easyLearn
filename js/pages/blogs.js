import '../shared/header.js';
import '../theme/change-theme.js';
import { getAllFromDatabase } from '../database/database-api.js';
import { addBlogCardsToDOM } from '../dom/dom-handlers.js';
import { activeFilterBtn, removeFilterButtonsClasses } from '../ui/ui-handlers.js';
import { getQueryParameters, removeLoader, sortArray } from '../utils/utils.js';
import { blogsWrapperElement, blogsSortButtons, searchBlogInput, categoryTitle } from '../dom/dom-elements.js';

let allBlogs = [];
let sortedBLogs = [];
let searchedBlogs = [];

const blogsParam = getQueryParameters('category');

switch (blogsParam) {
  case 'programming-basics':
    categoryTitle.textContent = 'مبانی برنامه نویسی';
    document.title = 'مبانی برنامه نویسی | ایزی‌لرن';
    break;
  case 'python':
    categoryTitle.textContent = 'پایتون';
    document.title = 'بلاگ - پایتون | ایزی‌لرن';
    break;
  case 'java-script':
    break;
    categoryTitle.textContent = 'جاوا اسکریپت';
    document.title = 'بلاگ - جاوا اسکریپت | ایزی‌لرن';
  case 'hack':
    categoryTitle.textContent = 'امنیت';
    document.title = 'بلاگ - امنیت | ایزی‌لرن';
    break;
  case null:
    categoryTitle.textContent = 'مقالات';
    document.title = 'ایزی‌لرن | بلاگ';
    break;
}

const getCategoryBlogs = (allBlogs) => {
  let categoryBlogs = null;
  switch (blogsParam) {
    case 'programming-basics':
      categoryBlogs = allBlogs.filter((blog) => blog.category === 'programming-basics');
      break;
    case 'python':
      categoryBlogs = allBlogs.filter((blog) => blog.category === 'python');
      break;
    case 'java-script':
      categoryBlogs = allBlogs.filter((blog) => blog.category === 'java-script');
      break;
    case 'hack':
      categoryBlogs = allBlogs.filter((blog) => blog.category === 'hack');
      break;
    case null:
      categoryBlogs = allBlogs;
      break;
    default:
      location.replace('./404.html');
  }
  return categoryBlogs;
};

async function fetchAndDisplayBlogs() {
  try {
    const blogs = await getAllFromDatabase('blogs');
    allBlogs = getCategoryBlogs(sortArray(blogs, 'create', true));

    addBlogCardsToDOM(allBlogs, blogsWrapperElement);
    getCategoryBlogs(allBlogs);
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
    case 'seen':
      sortedBLogs = sortArray(sortedBLogs, 'seen', true);
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

const sortBlogsHandler = (btn) => {
  const sortType = btn.dataset.sort;
  window.scrollY > 64 && window.scrollTo(0, 64);
  removeFilterButtonsClasses(blogsSortButtons);
  activeFilterBtn(btn);
  displaySortedBLogs(sortType);
};

const searchBlogHandler = (event) => {
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
  btn.addEventListener('click', () => sortBlogsHandler(btn));
});

searchBlogInput.addEventListener('input', searchBlogHandler);
window.addEventListener('load', removeLoader);
