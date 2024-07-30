import './header.js';
import './change-theme.js';
import { removeLoader, getQueryParameters } from './utils.js';
import { getOneFromDatabase } from './database-api.js';

let blog = null;
let blogParam = getQueryParameters('article');

async function fetchBlog() {
  try {
    blog = await getOneFromDatabase('blogs', 'slug', blogParam);

    blog ? addBlogToDom(blog) : location.replace('./404.html');
  } catch (error) {
    console.log('Failed to fetch blog', error);
  }
}

fetchBlog();

const addBlogToDom = (blog) => {
  console.log(blog);
};

window.addEventListener('load', removeLoader);
