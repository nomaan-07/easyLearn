import '../shared/header.js';
import '../theme/change-theme.js';
import { removeLoader } from '../utils/utils.js';
import { purchaseCourses } from '../database/database-handlers.js';
import { cartCoursesWrapper, cartPayBtn } from '../dom/dom-elements.js';
import { updateCartPageDetail, removeCourseFromCartHandler } from '../dom/dom-handlers.js';

updateCartPageDetail();

cartCoursesWrapper.addEventListener('click', (event) => removeCourseFromCartHandler(event, true));
cartPayBtn.addEventListener('click', purchaseCourses);
window.addEventListener('load', removeLoader);
