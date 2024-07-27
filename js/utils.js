const generateRandomID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-';
  const charactersLength = characters.length;
  const randomStringLength = Math.floor(Math.random() * (78 - 7)) + 6;
  const timestamp = new Date().getTime();
  let result = `${timestamp * 23}`;
  for (let i = 0; i < randomStringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += timestamp * 24;
  return result;
};

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

export { generateRandomID, getQueryParameters, getCommentID };
