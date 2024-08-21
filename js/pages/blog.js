import '../shared/header.js';
import '../theme/change-theme.js';
import { sweetAlert } from '../initializers/sweet-alert-initialize.js';
import { blogTemplate } from '../template/template.js';
import { insertToDOM, handleCommentReply } from '../dom/dom-handlers.js';
import { textareaAutoResize, toggleTextarea } from '../ui/ui-handlers.js';
import { getOneFromDatabase, updateInDatabase } from '../database/database-api.js';
import { fetchAndDisplayRecantBlogs, fetchAndDisplayComments, submitNewComment } from '../database/database-handlers.js';
import { removeLoader, getQueryParameters, breadCrumbLinksHandler, categoryInPersian, formatDate } from '../utils/utils.js';
import { localStorageUserID, breadcrumbBlogCategory, breadcrumbBlogName, blogWrapper, commentsWrapper, addNewCommentBtn, newCommentWrapper, newCommentTextarea, newCommentSubmitBtn, newCommentCloseBtn } from '../dom/dom-elements.js';

let blog = null;
let blogParam = getQueryParameters('blog');
let user = null;

const fetchUser = async () => {
  try {
    if (localStorageUserID) {
      const dbUser = await getOneFromDatabase('users', 'id', localStorageUserID);
      user = dbUser;
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
};

fetchUser();

fetchAndDisplayRecantBlogs();

const fetchAndDisplayBlog = async () => {
  try {
    const blog = await getOneFromDatabase('blogs', 'slug', blogParam);
    if (blog) {
      addBlogToDom(blog);
      updateInDatabase('blogs', { seen: blog.seen + 1 }, blog.id);
    } else {
      location.replace('./404.html');
    }
  } catch (error) {
    console.error('Failed to fetch blog', error);
  }
};

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
  seen: dbBlog.seen,
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

const copyBlogLinkToClipboard = async (event) => {
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
};

blogWrapper.addEventListener('click', copyBlogLinkToClipboard);
window.addEventListener('load', removeLoader);

addNewCommentBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea, user, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea));
newCommentSubmitBtn.addEventListener('click', () => submitNewComment(newCommentWrapper, newCommentTextarea, 'blog', blog.id, blog.title, blog.slug, user));
newCommentTextarea.addEventListener('input', textareaAutoResize);
commentsWrapper.addEventListener('click', (event) => handleCommentReply(event, 'blog', blog.title, blog.slug, user));
