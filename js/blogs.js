import './header.js';
import './change-theme.js';
import { getAllFromDatabase } from './database-api.js';
import { removeLoader, sortArray } from './utils.js';
import { blogsWrapperElement } from './dom-elements.js';
import { addBlogsToDom } from './dom-handlers.js';

getAllFromDatabase('blogs').then((blogs) => {
  const lastBlogs = sortArray(blogs, 'create', true);
  addBlogsToDom(lastBlogs, blogsWrapperElement);
});
window.addEventListener('load', removeLoader);
