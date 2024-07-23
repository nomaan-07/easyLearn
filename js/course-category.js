import { removeLoader, getAllFromDatabase, addCoursesToDOM, getFinalPrice } from './shared.js';
import './header.js';
import './change-theme.js';

const courseFilterButtons = document.querySelectorAll('.course-filter-btn');
const courseSortButtons = document.querySelectorAll('.course-sort-btn');
const coursesWrapperElement = document.querySelector('.courses-wrapper');
const searchCourseInput = document.querySelector('#search-course-input');
const categoryTitle = document.querySelector('.category-title');

let category = new URLSearchParams(location.search).get('category');

let categoryCourses = [];
let filteredCourses = [];
let searchedCourses = [];

switch (category) {
  case 'front-end':
    categoryTitle.innerText = 'فرانت اند';
    document.title = 'ایزی لرن | فرانت اند';
    break;
  case 'hack':
    categoryTitle.innerText = 'امنیت';
    document.title = 'ایزی لرن | امنیت';
    break;
  case 'python':
    categoryTitle.innerText = 'پایتون';
    document.title = 'ایزی لرن | پایتون';
    break;
  case 'soft-skill':
    categoryTitle.innerText = 'مهارت های نرم';
    document.title = 'ایزی لرن | مهارت های نرم';
    break;
  default:
    location.replace('404.html');
}

// Add Course to DOM
getAllFromDatabase('courses')
  .then((allCourses) => {
    categoryCourses = allCourses.filter((course) => {
      return course.category.includes(category);
    });
    filteredCourses = categoryCourses;
    coursesWrapperElement.innerHTML = '';
    addCoursesToDOM(categoryCourses, coursesWrapperElement);
  })
  .catch((error) => console.error('Error Getting Courses', error));

const displayCourses = (filterType) => {
  coursesWrapperElement.innerHTML = '';
  if (filterType === 'all') {
    filteredCourses = categoryCourses;
    searchCourseInput.value = '';
  } else if (filterType === 'free') {
    filteredCourses = categoryCourses.filter((course) => course.discount === 100);
  } else if (filterType === 'cash') {
    filteredCourses = categoryCourses.filter((course) => course.discount != 100);
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
    btn.classList.remove('theme-color-10');
    btn.classList.remove('theme-text-color');
  });
};

const removeFilterButtonsClasses = () => {
  courseFilterButtons.forEach((btn) => {
    btn.classList.remove('theme-color-10');
    btn.classList.remove('theme-text-color');
    btn.children[0].classList.remove('theme-bg-color');
    btn.children[0].classList.add('bg-slate-200');
    btn.children[0].classList.add('dark:bg-slate-500');
  });
};

const filterCourses = (btn) => {
  const filterType = btn.dataset.filter;

  window.scrollY > 64 && window.scrollTo(0, 64);

  removeSortButtonsClasses();
  removeFilterButtonsClasses();

  btn.classList.add('theme-color-10');
  btn.classList.add('theme-text-color');
  btn.children[0].classList.add('theme-bg-color');
  btn.children[0].classList.remove('bg-slate-200');
  btn.children[0].classList.remove('dark:bg-slate-500');

  displayCourses(filterType);
};

const sortCourses = (btn) => {
  const sortType = btn.dataset.sort;
  removeSortButtonsClasses();

  btn.classList.add('theme-color-10');
  btn.classList.add('theme-text-color');

  displayCourses(sortType);
};

const searchCourse = () => {
  removeSortButtonsClasses();
  let searchCourseInputValue = searchCourseInput.value.trim();
  let regex = new RegExp(searchCourseInputValue, 'gi');
  searchedCourses = filteredCourses.filter((course) => {
    return course.name.match(regex);
  });
  searchedCourses = searchCourseInputValue ? searchedCourses : filteredCourses;
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
