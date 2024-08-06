import './header.js';
import './change-theme.js';
import { removeLoader } from './utils.js';
import { updateCartPageDetail, removeCourseFromCartHandler } from './dom-handlers.js';
import { cartCoursesWrapper, cartPayBtn } from './dom-elements.js';
import { purchaseCourses } from './database-handlers.js';

updateCartPageDetail();

cartCoursesWrapper.addEventListener('click', (event) => removeCourseFromCartHandler(event, true));
cartPayBtn.addEventListener('click', purchaseCourses);
window.addEventListener('load', removeLoader);
