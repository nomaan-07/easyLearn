import { getAllFromDatabase, getOneFromDatabase, updateInDatabase, addToDatabase } from './database-api.js';
import { toggleTextarea } from './ui-handlers.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { generateRandomID, sortArray, CourseCommentSectionHandler } from './utils.js';
import { insertToDOM, addCourseCardsToDOM, addBlogCardsToDOM, addRecentBlogsToDom } from './dom-handlers.js';
import { latestCoursesWrapperElement, popularCoursesWrapperElement, lastBlogsWrapperElement, recentBlogsWrapper } from './dom-elements.js';

// index.js
async function fetchAndDisplayMainPageCourses() {
  try {
    const allCourses = await getAllFromDatabase('courses');
    const lastTenCourse = sortArray(allCourses, 'create', true).slice(0, 10);
    const twelveMostPopularCourse = sortArray(allCourses, 'students', true).slice(0, 12);
    addCourseCardsToDOM(lastTenCourse, latestCoursesWrapperElement);
    addCourseCardsToDOM(twelveMostPopularCourse, popularCoursesWrapperElement, true);
  } catch (error) {
    console.error('Failed to Fetch courses', error);
  }
}
// index.js
async function fetchAndDisplayMainPageBlogs() {
  try {
    const allBlogs = await getAllFromDatabase('blogs');
    const lastFiveBlog = sortArray(allBlogs, 'create', true).slice(0, 5);
    addBlogCardsToDOM(lastFiveBlog, lastBlogsWrapperElement);
  } catch (error) {
    console.error('Failed to fetch blogs', error);
  }
}

// course.js - blog.js
async function fetchAndDisplayComments(commentsWrapper, pageID) {
  try {
    const comments = await getAllFromDatabase('comments');
    let commentsElements = '';
    let FilteredComments = comments.filter((comment) => {
      return comment.page_id === pageID && comment.confirmed;
    });
    if (FilteredComments.length) {
      FilteredComments = sortArray(FilteredComments, 'create', true);
      FilteredComments.forEach((comment) => {
        commentsElements += CourseCommentSectionHandler(comment);
      });
      insertToDOM(commentsWrapper, commentsElements);
    } else {
      commentsWrapper.innerHTML = `<p class="p-4 font-VazirMedium sm:text-lg xl:text-xl">هنوز نظری برای این بخش ثبت نشده است.</p>`;
    }
  } catch (error) {
    console.error('Failed to fetch comments');
  }
}

// comments section - course.js - blog.js
const submitNewComment = (newCommentWrapper, newCommentTextarea, pageID, pageName, user) => {
  const message = newCommentTextarea.value.trim();
  let newComment = {
    id: generateRandomID(),
    message,
    page_id: pageID,
    page_name: pageName,
    writer: user.username,
    image_src: user.image_src,
  };

  if (message) {
    addToDatabase('comments', newComment);
    sweetAlert('نظر شما ثبت شد و پس از بازبینی منتشر می‌شود.', 'success');
    toggleTextarea(newCommentWrapper, newCommentTextarea);
  } else {
    sweetAlert();
    sweetAlert('نظر نمی‌تواند خالی باشد.', 'info');
  }
};

// comments section - course.js - blog.js
const submitCommentReply = (textarea, wrapper, commentID, user) => {
  const message = textarea.value.trim();
  let dbReplies = null;
  let newReply = null;
  getOneFromDatabase('comments', 'id', commentID).then((comment) => {
    newReply = {
      id: generateRandomID(),
      created_at: new Date(),
      message,
      confirmed: false,
      writer: user.username,
      image_src: user.image_src,
    };
    dbReplies = comment.replies ? comment.replies : [];
    dbReplies.push(newReply);

    if (message) {
      updateInDatabase('comments', { replies: dbReplies }, commentID);
      sweetAlert('نظر شما ثبت شد و پس از بازبینی منتشر می‌شود.', 'success');
      toggleTextarea(wrapper, textarea);
    } else {
      sweetAlert();
      sweetAlert('نظر نمی‌تواند خالی باشد.', 'info');
    }
  });
};

// blog.js
async function fetchAndDisplayRecantBlogs() {
  try {
    const allBlogs = await getAllFromDatabase('blogs');
    const lastFourBlog = sortArray(allBlogs, 'create', true).slice(0, 4);
    addRecentBlogsToDom(lastFourBlog, recentBlogsWrapper);
  } catch (error) {
    console.error('Failed to fetch recent blogs', error);
  }
}

export { fetchAndDisplayMainPageCourses, fetchAndDisplayMainPageBlogs, submitCommentReply, submitNewComment, fetchAndDisplayComments, fetchAndDisplayRecantBlogs };
