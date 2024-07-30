import './header.js';
import './change-theme.js';
import { breadcrumbBlogCategory, breadcrumbBlogName, blogWrapper } from './dom-elements.js';
import { removeLoader, getQueryParameters, breadCrumbLinksHandler, categoryInPersian, formatDate } from './utils.js';
import { getOneFromDatabase } from './database-api.js';
import { blogTemplate } from './template.js';
import { insertToDOM } from './dom-handlers.js';

let blog = null;
let blogParam = getQueryParameters('blog');

async function fetchAndDisplayBlog() {
  try {
    const blog = await getOneFromDatabase('blogs', 'slug', blogParam);

    blog ? addBlogToDom(blog) : location.replace('./404.html');
  } catch (error) {
    console.error('Failed to fetch blog', error);
  }
}

fetchAndDisplayBlog();

const createBlogObject = (dbBlog) => ({
  id: dbBlog.id,
  title: dbBlog.title,
  category: dbBlog.category,
  categoryName: categoryInPersian(dbBlog.category),
  slug: dbBlog.slug,
  imageSrc: dbBlog.image_src,
  writer: dbBlog.writer,
  readingTime: dbBlog.reading_time,
  date: formatDate(dbBlog.created_at),
  content: dbBlog.content,
  likes: dbBlog.likes,
  // FIXME
  isLiked: false,
});

const addBlogToDom = (dbBlog) => {
  blog = createBlogObject(dbBlog);
  // breadcrumb
  breadCrumbLinksHandler(breadcrumbBlogCategory, breadcrumbBlogName, blog.title, blog.slug, blog.category, blog.categoryName, 'blog');
  // blog
  insertToDOM(blogWrapper, blogTemplate(blog));
};

window.addEventListener('load', removeLoader);
