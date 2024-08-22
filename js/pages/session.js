import '../shared/header.js';
import '../theme/change-theme.js';
import '../initializers/plyr-initialize.js';
import { fetchAndDisplaySession, submitSessionNewQuestion } from '../database/database-handlers.js';
import { headlineLockSessionAlert, textareaAutoResize, toggleHeadLine } from '../ui/ui-handlers.js';
import { headlinesWrapper, newQuestionTextareaElement, newQuestionSubmitBtn } from '../dom/dom-elements.js';

fetchAndDisplaySession();

headlinesWrapper.addEventListener('click', toggleHeadLine);
headlinesWrapper.addEventListener('click', headlineLockSessionAlert);
newQuestionTextareaElement.addEventListener('input', textareaAutoResize);
newQuestionSubmitBtn.addEventListener('click', submitSessionNewQuestion);
