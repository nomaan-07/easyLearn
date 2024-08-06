import { courseCardTemplate, blogCardTemplate, recentBlogTemplate, loginBtnTemplate, headerCartCourseTemplate, cartCourseTemplate } from './template.js';
import { applyDiscountToPrice, formatDate, emptyDomElemContent, getParentID, getReplyCommentWrapper, getReplyCommentTextarea, calculateRemainingTime, createCartCourseObject, getLocalCourses } from './utils.js';
import { toggleTextarea } from './ui-handlers.js';
import { submitCommentReply } from './database-handlers.js';
import { headerCartCoursesNumberElements, headerCartCoursesWrappers, headerCartPayButtons, localStorageUserID, headerCartTotalPriceElements, cartNoCourseWrapper, cartDetailWrapper, cartCoursesWrapper, cartTotalPrice, cartCourseNumberElement, headerCartBadgeNumberElements } from './dom-elements.js';
import { sweetAlert } from './sweet-alert-initialize.js';

// course.js - dom-handlers.js - blog.js
const insertToDOM = (domElem, content) => {
  const fragment = document.createDocumentFragment();
  const tempDiv = document.createElement('div');

  tempDiv.insertAdjacentHTML('beforeend', content);

  // Append the child nodes of the temporary div to the DocumentFragment
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild);
  }

  emptyDomElemContent(domElem);

  domElem.appendChild(fragment);
};

// header.js
const addLoginBtnToDOM = (loginButtons, userID) => {
  loginButtons.forEach((btn) => {
    insertToDOM(btn, loginBtnTemplate(userID));
  });
};

window.addCourseToCart = (id) => {
  console.log(id);
};

// index.html - course-category.html
const addCourseCardsToDOM = (courses, coursesWrapper, isSwiper = false) => {
  let courseWrapperClass = isSwiper ? 'swiper-slide course-card' : 'course-card';
  let newCourse = null;
  let finalPrice = null;
  let coursesTemplate = '';
  courses.forEach((course) => {
    finalPrice = course.discount !== 100 ? applyDiscountToPrice(course.price, course.discount).toLocaleString('fa-IR') : 'رایگان!';
    newCourse = {
      id: course.id,
      name: course.name,
      caption: course.caption,
      src: course.image_src,
      teacher: course.teacher,
      students: course.students.toLocaleString('fa-IR'),
      rate: course.rate,
      discountPercent: course.discount,
      price: course.price.toLocaleString('fa-IR'),
      finalPrice: finalPrice,
      slug: course.slug,
      isPurchased: course.students_id && course.students_id.includes(localStorageUserID),
      courseWrapperClass,
    };
    coursesTemplate += courseCardTemplate(newCourse);
  });
  insertToDOM(coursesWrapper, coursesTemplate);
};

//index.html
const addBlogCardsToDOM = (blogs, blogsWrapper) => {
  let newBlog = null;
  let blogsTemplate = '';
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: formatDate(blog.created_at),
      seen: blog.seen,
      comments: blog.comments,
      image_src: blog.image_src,
      writer: blog.writer,
      readingTime: blog.reading_time,
      subject: blog.subject,
      slug: blog.slug,
    };
    blogsTemplate += blogCardTemplate(newBlog);
  });
  insertToDOM(blogsWrapper, blogsTemplate);
};

// blog.js
const addRecentBlogsToDom = (blogs, blogsWrapper) => {
  let blogsTemplate = '';
  let newBlog = null;
  blogs.forEach((blog) => {
    newBlog = {
      title: blog.title,
      date: formatDate(blog.created_at),
      slug: blog.slug,
      writer: blog.writer,
    };
    blogsTemplate += recentBlogTemplate(newBlog);
  });
  insertToDOM(blogsWrapper, blogsTemplate);
};

// comments section - course.js - blog.js
const handleCommentReply = (event, user) => {
  let element = event.target;
  let commentID = getParentID(element, 'comment');
  let wrapper = getReplyCommentWrapper(commentID);
  let textarea = getReplyCommentTextarea(commentID);

  // open reply
  if (element.closest('.open-reply-btn')) {
    toggleTextarea(wrapper, textarea, user, true);
  }
  // Cancel Reply
  if (element.closest('.reply-comment-cancel-btn')) {
    toggleTextarea(wrapper, textarea);
  }
  // submit reply
  if (element.closest('.reply-comment-submit-btn')) {
    submitCommentReply(textarea, wrapper, commentID, user);
  }
};

// course.js
const courseDiscountRemainingTimeDisplayHandler = (timestamp) => {
  const dayElem = document.getElementById('discount-day');
  const hourElem = document.getElementById('discount-hour');
  const minuteElem = document.getElementById('discount-minute');
  const secondElem = document.getElementById('discount-second');

  setInterval(() => {
    let remainingTime = calculateRemainingTime(timestamp);
    let remainingDays = String(remainingTime.days).padStart(2, '0');
    let remainingHours = String(remainingTime.hours).padStart(2, '0');
    let remainingMinutes = String(remainingTime.minutes).padStart(2, '0');
    let remainingSeconds = String(remainingTime.seconds).padStart(2, '0');
    dayElem.textContent = remainingDays;
    hourElem.textContent = remainingHours;
    minuteElem.textContent = remainingMinutes;
    secondElem.textContent = remainingSeconds;
  }, 1000);
};

const cartCourseDiscountRemainingTimeDisplayHandler = (element) => {
  const timestamp = Number(element.dataset.timestamp);
  if (!timestamp) return;

  setInterval(() => {
    let remainingTime = calculateRemainingTime(timestamp);

    let remainingDays = String(remainingTime.days).padStart(2, '0');
    let remainingHours = String(remainingTime.hours).padStart(2, '0');
    let remainingMinutes = String(remainingTime.minutes).padStart(2, '0');
    let remainingSeconds = String(remainingTime.seconds).padStart(2, '0');
    element.textContent = `${remainingDays} : ${remainingHours} : ${remainingMinutes} : ${remainingSeconds}`;
    element.textContent = `${remainingSeconds} : ${remainingMinutes} : ${remainingHours} : ${remainingDays}`;
  }, 1000);
};

const addToLocalCourseIfNotExist = (localCourses, course) => {
  if (localCourses) {
    let courseInLocalCourse = localCourses.find((localCourse) => localCourse.id === course.id);
    if (!courseInLocalCourse) {
      localCourses.push(course);
      sweetAlert(`دوره به سبد خرید اضافه شد.`, 'success');
    } else {
      sweetAlert('این دوره در سبد خرید موجود است.', 'failed');
    }

    localStorage.setItem('courses', JSON.stringify(localCourses));
  } else {
    sweetAlert(`دوره به سبد خرید اضافه شد.`, 'success');
    localStorage.setItem('courses', JSON.stringify([course]));
  }
};

// database-handlers.js
const addCourseToCartHandler = (event, courses) => {
  if (!event.target.closest('.course__add-to-cart-btn')) return;

  if (!localStorageUserID) {
    sweetAlert('برای ثبت نام در دوره، ابتدا باید در سایت ثبت نام کنید.', 'info');
    localStorage.removeItem('courses');
    return;
  }

  const courseID = event.target.closest('.course__add-to-cart-btn').dataset.course_id;
  const dbCourse = courses.length ? courses.find((course) => course.id === courseID) : courses;

  const course = createCartCourseObject(dbCourse);
  const localCourses = getLocalCourses();

  addToLocalCourseIfNotExist(localCourses, course);

  updateHederCartDetail();
};

// header.js
const removeCourseFromCartHandler = (event, cartPage = false) => {
  if (!event.target.closest('.cart__course-remove-btn')) return;
  const courseID = event.target.closest('.cart__course-remove-btn').dataset.course_id;

  const localCourses = getLocalCourses();
  const filterDeletedCourse = localCourses.filter((localCourse) => localCourse.id !== courseID);
  localStorage.setItem('courses', JSON.stringify(filterDeletedCourse));
  sweetAlert('دوره‌ از سبد خرید حذف شد.', 'success');
  updateHederCartDetail();
  if (cartCoursesWrapper) updateCartPageDetail();
};

// header.js
const updateHederCartDetail = () => {
  if (!localStorageUserID) {
    return;
  }

  let coursesTemplate = '';
  let courseTotalPrice = 0;
  const localCourses = getLocalCourses();

  if (localCourses && localCourses.length) {
    headerCartBadgeNumberElements.forEach((elem) => {
      elem.textContent = localCourses.length;
      elem.classList.remove('hidden');
      elem.classList.add('flex');
    });
    headerCartCoursesNumberElements.forEach((elem) => (elem.textContent = `${localCourses.length} دوره`));

    localCourses.forEach((course) => {
      coursesTemplate += headerCartCourseTemplate(course);
      courseTotalPrice += course.finalPriceInt;
    });

    headerCartCoursesWrappers.forEach((courseWrappers) => insertToDOM(courseWrappers, coursesTemplate));

    headerCartTotalPriceElements.forEach((elem) => {
      elem.classList.add('flex');
      elem.classList.remove('hidden');
      elem.querySelector('span').innerText = courseTotalPrice ? courseTotalPrice.toLocaleString('fa-IR') : 'صـــفر';
    });

    headerCartPayButtons.forEach((btn) => {
      btn.href = './cart.html';
      btn.textContent = 'تکمیل سفارش';
    });
  } else {
    headerCartBadgeNumberElements.forEach((elem) => {
      elem.textContent = 0;
      elem.classList.add('hidden');
      elem.classList.remove('flex');
    });
    headerCartCoursesNumberElements.forEach((elem) => (elem.innerText = `0 دوره`));
    headerCartCoursesWrappers.forEach((elem) => insertToDOM(elem, '<p class="font-VazirMedium overflow-hidden text-center">هنوز هیچ دوره‌ای انتخاب نشده است.</p>'));

    headerCartTotalPriceElements.forEach((elem) => {
      elem.classList.remove('flex');
      elem.classList.add('hidden');
      elem.querySelector('span').innerText = 'صـــفر';
    });

    headerCartPayButtons.forEach((btn) => {
      btn.href = './course-category.html?category=all-courses';
      btn.textContent = 'همه‌ی دوره‌ها';
    });
  }
};

// Cart.js
const updateCartPageDetail = () => {
  if (!localStorageUserID) {
    location.replace('./auth.html?operation=signup');
  }

  let coursesTemplate = '';
  let courseTotalPrice = 0;

  const localCourses = getLocalCourses();
  if (localCourses && localCourses.length) {
    cartCourseNumberElement.textContent = `${localCourses.length} دوره`;
    cartNoCourseWrapper.classList.add('hidden');
    cartDetailWrapper.classList.remove('hidden');
    localCourses.forEach((course) => {
      coursesTemplate += cartCourseTemplate(course);
      courseTotalPrice += course.finalPriceInt;
    });
    insertToDOM(cartCoursesWrapper, coursesTemplate);
    const timerElements = document.querySelectorAll('.cart__discount-timer');
    timerElements.forEach((element) => cartCourseDiscountRemainingTimeDisplayHandler(element));

    cartTotalPrice.textContent = courseTotalPrice ? courseTotalPrice.toLocaleString('fa-IR') : 'صـــفر';
  } else {
    cartCourseNumberElement.textContent = `0 دوره`;
    cartNoCourseWrapper.classList.remove('hidden');
    cartDetailWrapper.classList.add('hidden');
  }
};

export { insertToDOM, addLoginBtnToDOM, addCourseCardsToDOM, addBlogCardsToDOM, toggleTextarea, addRecentBlogsToDom, handleCommentReply, courseDiscountRemainingTimeDisplayHandler, addCourseToCartHandler, updateHederCartDetail, removeCourseFromCartHandler, updateCartPageDetail };
