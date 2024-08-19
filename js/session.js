import './header.js';
import './change-theme.js';
import './plyr-initialize.js';
import { headlinesWrapper } from './dom-elements.js';
import { fetchAndDisplaySession } from './database-handlers.js';
import { headlineLockSessionAlert, toggleHeadLine } from './ui-handlers.js';

fetchAndDisplaySession();

headlinesWrapper.addEventListener('click', toggleHeadLine);
headlinesWrapper.addEventListener('click', headlineLockSessionAlert);
