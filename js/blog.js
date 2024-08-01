import './header.js';
import './change-theme.js';
import { localStorageUserID, breadcrumbBlogCategory, breadcrumbBlogName, blogWrapper, commentsWrapper, addNewCommentBtn, newCommentWrapper, newCommentTextarea, newCommentSubmitBtn, newCommentCloseBtn } from './dom-elements.js';
import { removeLoader, getQueryParameters, breadCrumbLinksHandler, categoryInPersian, formatDate } from './utils.js';
import { getOneFromDatabase } from './database-api.js';
import { blogTemplate } from './template.js';
import { insertToDOM, handleReplyAndLike } from './dom-handlers.js';
import { fetchAndDisplayRecantBlogs, fetchAndDisplayComments, submitNewComment } from './database-handlers.js';
import { textareaAutoResize, toggleTextarea } from './ui-handlers.js';
import { sweetAlert } from './sweet-alert-initialize.js';

let blog = null;
let blogParam = getQueryParameters('blog');
let user = null;

async function fetchUser() {
  try {
    if (localStorageUserID) {
      const dbUser = await getOneFromDatabase('users', 'id', localStorageUserID);
      user = dbUser;
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
}

fetchUser();

fetchAndDisplayRecantBlogs();

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
  document.title = `${blog.title} | ایزی‌لرن`;
  // breadcrumb
  breadCrumbLinksHandler(breadcrumbBlogCategory, breadcrumbBlogName, blog.title, blog.slug, blog.category, blog.categoryName, 'blog');
  // blog
  insertToDOM(blogWrapper, blogTemplate(blog));
  // comments
  fetchAndDisplayComments(commentsWrapper, blog.id);
};

async function copyBlogLinkToClipboard(event) {
  try {
    const element = event.target.closest('.blog__copy-link-btn');
    if (!element) return;
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      sweetAlert('لینک کپی نشد، لطفا بعدا تلاش کنید.', 'failed');
      throw new Error('Clipboard API not supported');
    }
    await navigator.clipboard.writeText(element.dataset.link);
    sweetAlert('لینک با موفقیت کپی شد.', 'success');
  } catch (error) {
    console.error('Failed to copy link', error);
    sweetAlert('لینک کپی نشد، لطفا بعدا تلاش کنید.', 'failed');
  }
}

blogWrapper.addEventListener('click', copyBlogLinkToClipboard);
window.addEventListener('load', removeLoader);

addNewCommentBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea));
newCommentSubmitBtn.addEventListener('click', () => submitNewComment(newCommentWrapper, newCommentTextarea, blog.id, blog.title, user));
newCommentTextarea.addEventListener('input', textareaAutoResize);
commentsWrapper.addEventListener('click', (event) => handleReplyAndLike(event, user));
