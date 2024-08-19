import './header.js';
import './change-theme.js';
import { breadCrumbLinksHandler, categoryInPersian, getQueryParameters, removeLoader } from './utils.js';
import './plyr-initialize.js';
import { breadcrumbCourseCategory, breadcrumbCourseName, localStorageUserID } from './dom-elements.js';
import { getOneFromDatabase } from './database-api.js';
import { fetchAndDisplaySession } from './database-handlers.js';

fetchAndDisplaySession();

// window.addEventListener('load', removeLoader);
