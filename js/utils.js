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

// index.js - course.js - courses.js
const removeLoader = () => {
  document.body.classList.remove('h-0');
  document.body.classList.remove('overflow-y-hidden');
  document.querySelector('.loader-wrapper').classList.add('hide');
};

// course-category.js - course.js
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

// shared.js - course-category.js - course.js
const applyDiscountToPrice = (price, discount) => {
  return discount === 100 ? 0 : (price * (100 - discount)) / 100;
};

// index.js - course.js
const formatDate = (date) => {
  const dateList = new Date(date).toLocaleDateString('fa-IR').split('/');
  const year = dateList[0];
  const month = dateList[1].padStart(2, '۰');
  const day = dateList[2].padStart(2, '۰');
  return `${year}/${month}/${day}`;
};

// course-category.js - course.js
const categoryInPersian = (category) => {
  let categoryPersian = null;
  switch (category) {
    case 'python':
      categoryPersian = 'پایتون';
      break;
    case 'hack':
      categoryPersian = 'امنیت';
      break;
    case 'front-end':
      categoryPersian = 'فرانت اند';
      break;
    case 'soft-skill':
      categoryPersian = 'مهارت های نرم';
      break;
    case 'all-courses':
      categoryPersian = 'دوره ها';
      break;
    case 'popular-courses':
      categoryPersian = 'دوره های محبوب';
      break;
  }
  return categoryPersian;
};

export { removeLoader, generateRandomID, getQueryParameters, getCommentID, applyDiscountToPrice, formatDate, categoryInPersian };
