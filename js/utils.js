// course.js
const getQueryParameters = (paramName) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
};

// course.js
const getCommentID = (el) => {
  const comment = el.closest('.comment');
  const commentID = comment.getAttribute('id');
  return commentID;
};

export { getQueryParameters, getCommentID };
