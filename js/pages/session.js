import '../shared/header.js';
import '../theme/change-theme.js';
import '../initializers/plyr-initialize.js';
import { headlinesWrapper } from '../dom/dom-elements.js';
import { fetchAndDisplaySession } from '../database/database-handlers.js';
import { headlineLockSessionAlert, toggleHeadLine } from '../ui/ui-handlers.js';

fetchAndDisplaySession();

headlinesWrapper.addEventListener('click', toggleHeadLine);
headlinesWrapper.addEventListener('click', headlineLockSessionAlert);
