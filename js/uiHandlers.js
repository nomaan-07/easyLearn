const updateLike = (isLiked, svg, likeElem, count) => {
  if (isLiked) {
    svg.innerHTML = '<use href="#heart"></use>';
    likeElem.innerText = count + 1;
  } else {
    svg.innerHTML = '<use href="#heart-outline"></use>';
    likeElem.innerText = count - 1;
  }
};
// course.js
// FIXME: add to database instead of localStorage
const toggleLike = (btn, isLoading = false) => {
  const commentID = getCommentID(btn);
  const isLiked = localStorage.getItem(`isLiked-${commentID}`) === 'true';
  const likeElem = btn.children[1];
  const svg = btn.children[0];
  const likeCount = Number(likeElem.innerText);
  if (isLoading) {
    updateLike(isLiked, svg, likeElem, likeCount);
  } else {
    localStorage.setItem(`isLiked-${commentID}`, !isLiked);
    updateLike(!isLiked, svg, likeElem, likeCount);
  }
};

export { toggleLike };
