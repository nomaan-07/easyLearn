import '../shared/header.js';
import '../theme/change-theme.js';
import '../initializers/plyr-initialize.js';
import { headlinesWrapper, localStorageUserID, newQuestionTextareaElement } from '../dom/dom-elements.js';
import { fetchAndDisplaySession, fetchAndDisplaySessionQuestions } from '../database/database-handlers.js';
import { headlineLockSessionAlert, textareaAutoResize, toggleHeadLine } from '../ui/ui-handlers.js';

fetchAndDisplaySession();

if (localStorageUserID) {
  fetchAndDisplaySessionQuestions();
}

headlinesWrapper.addEventListener('click', toggleHeadLine);
headlinesWrapper.addEventListener('click', headlineLockSessionAlert);
newQuestionTextareaElement.addEventListener('input', textareaAutoResize);
