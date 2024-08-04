import { getAllFromDatabase } from './database-api.js';
import { addCourseCardsToDOM, addCourseToCartHandler } from './dom-handlers.js';
import './header.js';
import './change-theme.js';
import { courseFilterButtons, courseSortButtons, coursesWrapperElement, searchCourseInput, categoryTitle, titleIcon, searchResultWrapper } from './dom-elements.js';
import { removeLoader, getQueryParameters, categoryInPersian, sortArray } from './utils.js';
import { activeFilterBtn, removeFilterButtonsClasses, removeSortButtonsClasses, activeSortBtn } from './ui-handlers.js';

let categoryParam = getQueryParameters('category');
let searchParam = getQueryParameters('search');

let categoryCourses = [];
let filteredCourses = [];
let searchedCourses = [];

if (categoryParam && categoryInPersian(categoryParam)) {
  const categoryPersian = categoryInPersian(categoryParam);
  if (categoryPersian === 'دوره ها' || categoryPersian === 'دوره های محبوب') {
    categoryTitle.innerText = `${categoryPersian}`;
  } else {
    categoryTitle.innerText = `دوره های ${categoryPersian}`;
  }
  document.title = `ایزی‌لرن | ${categoryPersian}`;
} else if (searchParam) {
  categoryTitle.innerText = `جستجو: ${searchParam}`;
  document.title = `جستجو برای: ${searchParam}`;
  titleIcon.src = './images/icons/zoom.png';
  // some codes
} else {
  location.replace('404.html');
}

// Add Course to DOM
async function fetchAndDisplayCategoryCoursesToDOM() {
  try {
    const allCourses = await getAllFromDatabase('courses');
    if (categoryParam === 'all-courses') {
      categoryCourses = sortArray(allCourses, 'create', true);
    } else if (categoryParam === 'popular-courses') {
      categoryCourses = sortArray(allCourses, 'students', true);
      activeSortBtn(courseSortButtons[2]);
    } else if (searchParam) {
      categoryCourses = overallSearchHandler(allCourses);
    } else {
      categoryCourses = allCourses.filter((course) => {
        return course.category.includes(categoryParam);
      });
    }
    filteredCourses = categoryCourses;
    addCourseCardsToDOM(categoryCourses, coursesWrapperElement);
    coursesWrapperElement.addEventListener('click', (event) => addCourseToCartHandler(event, categoryCourses));
  } catch (error) {
    console.error('Failed to fetch courses', error);
  }
}

fetchAndDisplayCategoryCoursesToDOM();

// overall Search handler
const overallSearchHandler = (allCourses) => {
  let regex = new RegExp(`${searchParam}`, 'gi');
  let result = allCourses.filter((course) => {
    return course.name.match(regex) || course.search_keywords.includes(searchParam.toLowerCase());
  });
  result.length || searchResultWrapper.classList.remove('hidden');
  return Array.from(new Set(result));
};

// Filter and Sort Courses and Add Them To DOM
const displayCourses = (filterType) => {
  let courses = null;
  if (searchedCourses.length > 0) {
    courses = searchedCourses;
  } else {
    courses = categoryCourses;
    searchCourseInput.value = '';
  }

  if (filterType === 'all') {
    filteredCourses = courses;
  } else if (filterType === 'free') {
    filteredCourses = courses.filter((course) => course.discount === 100);
  } else if (filterType === 'cash') {
    filteredCourses = courses.filter((course) => course.discount != 100);
  } else if (filterType === 'cheapest') {
    filteredCourses = sortArray(filteredCourses, 'price');
  } else if (filterType === 'expensive') {
    filteredCourses = sortArray(filteredCourses, 'price', true);
  } else if (filterType === 'popular') {
    filteredCourses = sortArray(filteredCourses, 'students', true);
  }
  addCourseCardsToDOM(filteredCourses, coursesWrapperElement);
};

const filterCourses = (btn) => {
  const filterType = btn.dataset.filter;

  window.scrollY > 64 && window.scrollTo(0, 64);

  removeSortButtonsClasses(courseSortButtons);
  removeFilterButtonsClasses(courseFilterButtons);

  activeFilterBtn(btn);
  displayCourses(filterType);
};

const sortCourses = (btn) => {
  const sortType = btn.dataset.sort;
  removeSortButtonsClasses(courseSortButtons);

  activeSortBtn(btn);

  displayCourses(sortType);
};

const searchCourse = () => {
  removeSortButtonsClasses(courseSortButtons);
  removeFilterButtonsClasses(courseFilterButtons);
  activeFilterBtn(courseFilterButtons[0]);
  let searchCourseInputValue = searchCourseInput.value.trim();
  let regex = new RegExp(searchCourseInputValue, 'gi');
  searchedCourses = categoryCourses.filter((course) => {
    return course.name.match(regex) || course.search_keywords.includes(searchCourseInputValue.toLowerCase());
  });

  if (searchedCourses.length) {
    searchResultWrapper.classList.add('hidden');
  } else {
    searchResultWrapper.classList.remove('hidden');
  }

  if (searchCourseInputValue) {
    filteredCourses = searchedCourses;
  } else {
    filteredCourses = categoryCourses;
    searchedCourses = [];
  }
  searchedCourses = searchCourseInputValue ? searchedCourses : categoryCourses;
  addCourseCardsToDOM(searchedCourses, coursesWrapperElement);
};

courseFilterButtons.forEach((btn) => {
  btn.addEventListener('click', () => filterCourses(btn));
});
courseSortButtons.forEach((btn) => {
  btn.addEventListener('click', () => sortCourses(btn));
});

searchCourseInput.addEventListener('input', searchCourse);
window.addEventListener('load', removeLoader);
