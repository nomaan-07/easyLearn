import { favIcon } from '../dom/dom-elements.js';
import { getThemeFromLocalStorage } from '../utils/utils.js';

const themes = getThemeFromLocalStorage();

if (themes) {
  document.documentElement.className = `scroll-smooth ${themes.mainTheme} ${themes.colorTheme}`;
  favIcon.href = `images/favIcons/${themes.colorTheme}-favicon-64x64.png`;
}
