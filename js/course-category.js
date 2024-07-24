import { removeLoader, getAllFromDatabase, addCoursesToDOM, getFinalPrice } from './shared.js';
import './header.js';
import './change-theme.js';

const courseFilterButtons = document.querySelectorAll('.course-filter-btn');
const courseSortButtons = document.querySelectorAll('.course-sort-btn');
const coursesWrapperElement = document.querySelector('.courses-wrapper');
const searchCourseInput = document.querySelector('#search-course-input');
const categoryTitle = document.querySelector('.category-title');
const titleIcon = document.querySelector('.title-icon');
const searchResultWrapper = document.querySelector('.no-result-wrapper');

let categoryParam = new URLSearchParams(location.search).get('category');
let searchParam = new URLSearchParams(location.search).get('search');

let categoryCourses = [];
let filteredCourses = [];
let searchedCourses = [];

if (categoryParam) {
  switch (categoryParam) {
    case 'front-end':
      categoryTitle.innerText = 'دوره های فرانت اند';
      document.title = 'ایزی‌لرن | فرانت اند';
      break;
    case 'hack':
      categoryTitle.innerText = 'دوره های امنیت';
      document.title = 'ایزی‌لرن | امنیت';
      break;
    case 'python':
      categoryTitle.innerText = 'دوره های پایتون';
      document.title = 'ایزی‌لرن | پایتون';
      break;
    case 'soft-skill':
      categoryTitle.innerText = 'دوره های مهارت های نرم';
      document.title = 'ایزی‌لرن | مهارت های نرم';
      break;
    case 'all-courses':
      categoryTitle.innerText = 'دوره ها';
      document.title = 'ایزی‌لرن | دوره ها';
      break;
    case 'popular-courses':
      categoryTitle.innerText = 'دوره های محبوب';
      document.title = 'ایزی‌لرن | دوره های محبوب';
      break;
    default:
      location.replace('404.html');
  }
} else if (searchParam) {
  categoryTitle.innerText = `جستجو: ${searchParam}`;
  document.title = `ایزی‌لرن | ${searchParam}`;
  titleIcon.src = './images/icons/zoom.png';
  // some codes
} else {
  location.replace('404.html');
}

// overall Search handler
const overallSearchHandler = (allCourses) => {
  let regex = new RegExp(searchParam, 'gi');
  let searchResult = allCourses.filter((course) => {
    return course.name.match(regex);
  });
  searchResult.length > 0 || searchResultWrapper.classList.remove('hidden');
  return searchResult;
};

// Add Course to DOM
getAllFromDatabase('courses')
  .then((allCourses) => {
    if (categoryParam === 'all-courses') {
      categoryCourses = allCourses.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (categoryParam === 'popular-courses') {
      categoryCourses = allCourses.sort((a, b) => b.students - a.students);
      removeSortButtonsClasses();
      ActiveSortBtn(courseSortButtons[2]);
    } else if (searchParam) {
      categoryCourses = overallSearchHandler(allCourses);
    } else {
      categoryCourses = allCourses.filter((course) => {
        return course.category.includes(categoryParam);
      });
    }
    filteredCourses = categoryCourses;
    coursesWrapperElement.innerHTML = '';
    addCoursesToDOM(categoryCourses, coursesWrapperElement);
  })
  .catch((error) => console.error('Error Getting Courses', error));

// Filter and Sort Courses and Add Them To DOM
const displayCourses = (filterType) => {
  let courses = searchedCourses.length > 0 ? searchedCourses : categoryCourses;

  coursesWrapperElement.innerHTML = '';
  if (filterType === 'all') {
    filteredCourses = courses;
  } else if (filterType === 'free') {
    filteredCourses = courses.filter((course) => course.discount === 100);
  } else if (filterType === 'cash') {
    filteredCourses = courses.filter((course) => course.discount != 100);
  } else if (filterType === 'cheapest') {
    filteredCourses = [...filteredCourses].sort((a, b) => getFinalPrice(a.price, a.discount) - getFinalPrice(b.price, b.discount));
  } else if (filterType === 'expensive') {
    filteredCourses = [...filteredCourses].sort((a, b) => getFinalPrice(b.price, b.discount) - getFinalPrice(a.price, a.discount));
  } else if (filterType === 'popular') {
    filteredCourses = [...filteredCourses].sort((a, b) => b.students - a.students);
  }
  addCoursesToDOM(filteredCourses, coursesWrapperElement);
};

const removeSortButtonsClasses = () => {
  courseSortButtons.forEach((btn) => {
    btn.classList.remove('theme-bg-color-10');
    btn.classList.remove('theme-text-color');
  });
};

const removeFilterButtonsClasses = () => {
  courseFilterButtons.forEach((btn) => {
    btn.classList.remove('theme-bg-color-10');
    btn.classList.remove('theme-text-color');
    btn.children[0].classList.remove('theme-bg-color');
    btn.children[0].classList.add('bg-slate-200');
    btn.children[0].classList.add('dark:bg-slate-500');
  });
};

function ActiveSortBtn(btn) {
  btn.classList.add('theme-bg-color-10');
  btn.classList.add('theme-text-color');
}
function ActiveFilterBtn(btn) {
  btn.classList.add('theme-bg-color-10');
  btn.classList.add('theme-text-color');
  btn.children[0].classList.add('theme-bg-color');
  btn.children[0].classList.remove('bg-slate-200');
  btn.children[0].classList.remove('dark:bg-slate-500');
}
const filterCourses = (btn) => {
  const filterType = btn.dataset.filter;

  window.scrollY > 64 && window.scrollTo(0, 64);

  removeSortButtonsClasses();
  removeFilterButtonsClasses();

  ActiveFilterBtn(btn);
  displayCourses(filterType);
};

const sortCourses = (btn) => {
  const sortType = btn.dataset.sort;
  removeSortButtonsClasses();

  ActiveSortBtn(btn);

  displayCourses(sortType);
};

const searchCourse = () => {
  removeSortButtonsClasses();
  removeFilterButtonsClasses();
  ActiveFilterBtn(courseFilterButtons[0]);
  let searchCourseInputValue = searchCourseInput.value.trim();
  let regex = new RegExp(searchCourseInputValue, 'gi');
  searchedCourses = categoryCourses.filter((course) => {
    return course.name.match(regex);
  });
  if (searchCourseInputValue) {
    filteredCourses = searchedCourses;
  } else {
    filteredCourses = categoryCourses;
    searchedCourses = [];
  }
  searchedCourses = searchCourseInputValue ? searchedCourses : categoryCourses;
  addCoursesToDOM(searchedCourses, coursesWrapperElement);
};

courseFilterButtons.forEach((btn) => {
  btn.addEventListener('click', () => filterCourses(btn));
});
courseSortButtons.forEach((btn) => {
  btn.addEventListener('click', () => sortCourses(btn));
});

window.addEventListener('load', removeLoader);

searchCourseInput.addEventListener('input', searchCourse);