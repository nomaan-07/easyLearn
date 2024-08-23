import { favIcon } from '../dom/dom-elements.js';
import { getThemeFromLocalStorage } from '../utils/utils.js';

const theme = getThemeFromLocalStorage();

if (theme) {
  document.documentElement.className = `scroll-smooth ${theme.mainTheme} ${theme.colorTheme}`;
  favIcon.href = `images/favIcons/${theme.colorTheme}-favicon-64x64.png`;
}
