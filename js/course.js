import { getAllFromDatabase, getOneFromDatabase, updateInDatabase } from './database-api.js';
import './header.js';
import './change-theme.js';
import { courseInfoTemplate, courseDataTemplate } from './template.js';
import {
  courseInfoWrapper,
  courseDataWrapper,
  courseDescription,
  headlinesWrapper,
  descriptionShadow,
  commentsWrapper,
  showAllDescriptionBtn,
  addNewCommentBtn,
  newCommentWrapper,
  newCommentTextarea,
  newCommentSubmitBtn,
  newCommentCloseBtn,
  breadcrumbCourseCategory,
  breadcrumbCourseName,
} from './dom-elements.js';

import { removeLoader, getQueryParameters, applyDiscountToPrice, formatDate, getParentID, getReplyCommentWrapper, getReplyCommentTextarea } from './utils.js';
import { toggleLike, toggleTextarea, textareaAutoResize } from './ui-handlers.js';
import { breadCrumbLinksHandler, CourseHeadlineSectionHandler, CourseCommentSectionHandler } from './dom-handlers.js';
import { submitCommentReply } from './database-handlers.js';

let courseSearchParam = getQueryParameters('course');

if (!courseSearchParam) {
  location.replace('404.html');
}

const addCourseDetailToDOM = (courseObject) => {
  courseDescription.innerHTML = '';
  let course = {
    finalPrice: courseObject.discount !== 100 ? applyDiscountToPrice(courseObject.price, courseObject.discount).toLocaleString('fa-IR') : 'رایگان',
    id: courseObject.id,
    name: courseObject.name,
    caption: courseObject.caption,
    src: courseObject.src,
    teacher: courseObject.teacher,
    students: courseObject.students.toLocaleString('fa-IR'),
    ratePercent: Math.floor((courseObject.rate * 100) / 5),
    discountPercent: courseObject.discount,
    price: courseObject.price.toLocaleString('fa-IR'),
    description: courseObject.description,
    category: courseObject.category[0],
    slug: courseObject.slug,
    headlines: courseObject.headlines,
    sessionsCount: courseObject.sessions_count,
    videosLength: courseObject.videos_length,
    situation: courseObject.complete ? 'تکمیل' : 'درحال برگزاری',
    // FIXME: updated_at instead of created_at
    date: formatDate(courseObject.created_at),
  };
  document.title = `${course.name} | ایزی‌لرن`;
  // breadcrumb
  breadCrumbLinksHandler(breadcrumbCourseCategory, breadcrumbCourseName, course.name, course.slug, course.category, 'course');
  // Info and banner section
  courseInfoWrapper.innerHTML = '';
  courseInfoWrapper.insertAdjacentHTML('beforeend', courseInfoTemplate(course));
  // Data section
  courseDataWrapper.innerHTML = '';
  courseDataWrapper.insertAdjacentHTML('beforeend', courseDataTemplate(course));

  // Description section
  courseDescription.innerHTML = '';
  if (course.description) {
    courseDescription.insertAdjacentHTML('beforeend', course.description);
  } else {
    courseDescription.closest('#course-description-wrapper').classList.add('hidden');
  }

  // Headline section
  headlinesWrapper.innerHTML = '';
  if (course.headlines) {
    course.headlines.forEach((headline) => {
      headlinesWrapper.insertAdjacentHTML('beforeend', CourseHeadlineSectionHandler(headline));
    });
    const headlinesTitleElem = document.querySelectorAll('.headline__title');
    headlinesTitleElem.forEach((titleElem) =>
      titleElem.addEventListener('click', () => {
        toggleHeadLine(titleElem);
      })
    );
  } else {
    headlinesWrapper.parentElement.classList.add('hidden');
  }

  // comments section
  getAllFromDatabase('comments').then((comments) => {
    commentsWrapper.innerHTML = '';
    let FilteredComments = comments.filter((comment) => {
      return comment.course_id === course.id;
    });
    if (FilteredComments.length) {
      FilteredComments.forEach((comment) => {
        commentsWrapper.insertAdjacentHTML('beforeend', CourseCommentSectionHandler(comment));
      });
      // const replyOpenButtons = document.querySelectorAll('.open-reply-btn');
      // const allCommentsTextareaElements = document.querySelectorAll('.reply-comment-textarea');
      // const replyCancelButtons = document.querySelectorAll('.reply-comment-cancel-btn');
      // const replySubmitButtons = document.querySelectorAll('.reply-comment-submit-btn');

      // handleReply(replyOpenButtons, replyCancelButtons, replySubmitButtons, allCommentsTextareaElements, course.id);
    } else {
      commentsWrapper.innerHTML = `<p class="p-4 font-VazirMedium sm:text-lg xl:text-xl">هنوز نظری برای این بخش ثبت نشده است.</p>`;
    }
  });
};

getOneFromDatabase('courses', 'slug', courseSearchParam)
  .then((course) => {
    addCourseDetailToDOM(course);
  })
  .catch(() => location.replace('404.html'));

const toggleDescription = () => {
  const descriptionToggleClasses = ['max-h-48', 'sm:max-h-80', 'md:max-h-96', 'max-h-full'];
  descriptionToggleClasses.forEach((toggleClass) => {
    courseDescription.classList.toggle(toggleClass);
  });

  showAllDescriptionBtn.children[0].classList.toggle('hidden');
  showAllDescriptionBtn.children[1].classList.toggle('hidden');
  showAllDescriptionBtn.children[2].classList.toggle('rotate-180');

  descriptionShadow.classList.toggle('hidden');
};

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

  if (headlineBody.offsetHeight === 0) {
    headlineBody.style.maxHeight = `${totalHeadlineBodyHeight}px`;
  } else {
    headlineBody.style.maxHeight = '0px';
  }
};

//  reply comments
// const handleReply = (openButtons, cancelButtons, submitButtons, textareaElements, postID) => {
//   let commentID = null;
//   let wrapper = null;
//   let textarea = null;
//   openButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       commentID = getParentID(btn, 'comment');
//       wrapper = document.querySelector(`#reply-wrapper-comment-${commentID}`);
//       textarea = document.querySelector(`#reply-textarea-comment-${commentID}`);
//       toggleTextarea(wrapper, textarea, true);
//     });
//   });
//   cancelButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       commentID = getParentID(btn, 'comment');
//       wrapper = document.querySelector(`#reply-wrapper-comment-${commentID}`);
//       textarea = document.querySelector(`#reply-textarea-comment-${commentID}`);
//       toggleTextarea(wrapper, textarea);
//     });
//   });
//   submitButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       commentID = getParentID(btn, 'comment');
//       wrapper = document.querySelector(`#reply-wrapper-comment-${commentID}`);
//       textarea = document.querySelector(`#reply-textarea-comment-${commentID}`);
//       submitReplyComment(wrapper, textarea, commentID);
//     });
//   });
//   textareaElements.forEach((el) => el.addEventListener('input', textareaAutoResize));
// };

// const submitReplyComment = (wrapper, textarea, commentID) => {
//   const message = textarea.value.trim();
//   let dbReplies = null;
//   let newReply = null;
//   getOneFromDatabase('comments', 'id', commentID).then((comment) => {
//     newReply = {
//       id: comment.replies.length + 1,
//       date: new Date(),
//       message,
//       confirmed: false,
//       // FIXME
//       writer: 'نعمان ریگی',
//       // FIXME
//       image_src:
//         'https://vqvbwalqiwdeyzuiltqm.supabase.co/storage/v1/object/sign/avatars/my-avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL215LWF2YXRhci5wbmciLCJpYXQiOjE3MjIxMTc0MzksImV4cCI6MTc1MzY1MzQzOX0.S0ITdZzEtumNjKJwpEZOrddHWluxZt2qv5-_kQMfE90&t=2024-07-27T21%3A57%3A18.946Z',
//     };
//     dbReplies = comment.replies;
//     dbReplies.push(newReply);

//     updateInDatabase('comments', { replies: dbReplies }, commentID);
//   });
//   toggleTextarea(wrapper, textarea);
//   textarea.value = '';
// };

const handleLike = () => {
  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach((btn) => {
    toggleLike(btn, true);
  });
  likeButtons.forEach((btn) => btn.addEventListener('click', () => toggleLike(btn)));
};

const handleReplyAndLike = (event) => {
  let commentID = null;
  let wrapper = null;
  let textarea = null;
  let openReplyBtn = null;
  // open reply
  if (event.target.matches('.open-reply-btn') || event.target.closest('.open-reply-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    toggleTextarea(wrapper, textarea, true);
  }
  // Cancel Reply
  if (event.target.matches('.reply-comment-cancel-btn') || event.target.closest('.reply-comment-cancel-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    toggleTextarea(wrapper, textarea, false);
    textarea.value = '';
  }
  // submit reply
  if (event.target.matches('.reply-comment-submit-btn') || event.target.closest('.reply-comment-submit-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    submitCommentReply(textarea, commentID);
    toggleTextarea(wrapper, textarea, false);
    textarea.value = '';
  }
  // like handle
  if (event.target.matches('.like-btn') || event.target.closest('.like-btn')) {
    commentID = getParentID(event.target, 'comment');
    wrapper = getReplyCommentWrapper(commentID);
    textarea = getReplyCommentTextarea(commentID);
    console.log(commentID);
  }
};

// FIXME: Send Comment to database
const submitComment = (textarea, wrapper) => {
  const comment = textarea.value.trim();
  toggleTextarea(newCommentWrapper, newCommentTextarea);
  // TODO: modal comment submit
};

showAllDescriptionBtn.addEventListener('click', toggleDescription);
addNewCommentBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea, true));
newCommentCloseBtn.addEventListener('click', () => toggleTextarea(newCommentWrapper, newCommentTextarea));
newCommentSubmitBtn.addEventListener('click', () => submitComment(newCommentTextarea, newCommentWrapper));
newCommentTextarea.addEventListener('input', textareaAutoResize);
commentsWrapper.addEventListener('click', handleReplyAndLike);
window.addEventListener('load', removeLoader);
