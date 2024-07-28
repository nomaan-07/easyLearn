import { getOneFromDatabase, updateInDatabase, addToDatabase } from './database-api.js';
import { toggleTextarea } from './ui-handlers.js';

// course.js
const submitNewComment = (newCommentWrapper, newCommentTextarea, pageID) => {
  const message = newCommentTextarea.value.trim();
  let newComment = {
    message,
    page_id: pageID,
    // FIXME
    writer: 'نعمان ریگی',
    // FIXME
    image_src:
      'https://vqvbwalqiwdeyzuiltqm.supabase.co/storage/v1/object/sign/avatars/my-avatar.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL215LWF2YXRhci5wbmciLCJpYXQiOjE3MjIxMTc0MzksImV4cCI6MTc1MzY1MzQzOX0.S0ITdZzEtumNjKJwpEZOrddHWluxZt2qv5-_kQMfE90&t=2024-07-27T21%3A57%3A18.946Z',
  };
  toggleTextarea(newCommentWrapper, newCommentTextarea);
  // TODO: modal comment submit
  message && addToDatabase('comments', newComment);
};

// course.js
const submitCommentReply = (textarea, commentID) => {
  const message = textarea.value.trim();
  let dbReplies = null;
  let newReply = null;
  getOneFromDatabase('comments', 'id', commentID).then((comment) => {
    newReply = {
      id: comment.replies ? comment.replies.length + 1 : 1,
      date: new Date(),
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

    message && updateInDatabase('comments', { replies: dbReplies }, commentID);
  });
};

export { submitCommentReply, submitNewComment };
