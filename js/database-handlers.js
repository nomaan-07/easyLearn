import { getOneFromDatabase, updateInDatabase, addToDatabase } from './database-api.js';
import { toggleTextarea } from './ui-handlers.js';
import { sweetAlert } from './sweet-alert-initialize.js';
import { generateRandomID } from './utils.js';

// course.js
const submitNewComment = (newCommentWrapper, newCommentTextarea, pageID, pageName) => {
  const message = newCommentTextarea.value.trim();
  let newComment = {
    id: generateRandomID(),
    message,
    page_id: pageID,
    page_name: pageName,
    // FIXME
    writer: 'نعمان ریگی',
    // FIXME
    image_src:
      'https://vqvbwalqiwdeyzuiltqm.supabase.co/storage/v1/object/sign/avatars/my-avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL215LWF2YXRhci5wbmciLCJpYXQiOjE3MjIxMTc0MzksImV4cCI6MTc1MzY1MzQzOX0.S0ITdZzEtumNjKJwpEZOrddHWluxZt2qv5-_kQMfE90&t=2024-07-27T21%3A57%3A18.946Z',
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

// course.js
const submitCommentReply = (textarea, wrapper, commentID) => {
  const message = textarea.value.trim();
  let dbReplies = null;
  let newReply = null;
  getOneFromDatabase('comments', 'id', commentID).then((comment) => {
    newReply = {
      id: generateRandomID(),
      created_at: new Date(),
      message,
      confirmed: false,
      // FIXME
      writer: 'نعمان ریگی',
      // FIXME
      image_src:
        'https://vqvbwalqiwdeyzuiltqm.supabase.co/storage/v1/object/sign/avatars/my-avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL215LWF2YXRhci5wbmciLCJpYXQiOjE3MjIxMTc0MzksImV4cCI6MTc1MzY1MzQzOX0.S0ITdZzEtumNjKJwpEZOrddHWluxZt2qv5-_kQMfE90&t=2024-07-27T21%3A57%3A18.946Z',
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

export { submitCommentReply, submitNewComment };
