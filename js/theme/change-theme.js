import { colorPlateBtn, colorPlate, changeThemeButtons, darkThemeBtn, favIcon, heroLightSVG, heroDarkSVG } from './../dom/dom-elements.js';
import { getThemeFromLocalStorage } from '../utils/utils.js';

const themes = getThemeFromLocalStorage();
let mainTheme = themes ? themes.mainTheme : 'light';
let colorTheme = themes ? themes.colorTheme : 'fuchsia';

if (!themes) {
  setThemeToLocalStorage();
} else {
  changeTheme();
}

function setThemeToLocalStorage() {
  localStorage.setItem('themes', JSON.stringify({ mainTheme, colorTheme }));
}

function changeTheme() {
  document.documentElement.className = `scroll-smooth ${mainTheme} ${colorTheme}`;

  setThemeToLocalStorage();

  favIcon.href = `images/favIcons/${colorTheme}-favicon-64x64.png`;

  if (mainTheme === 'dark') {
    darkThemeBtn.dataset.theme = 'light';
    darkThemeBtn.classList.remove('bg-slate-900');
    darkThemeBtn.classList.add('bg-white');
    if (heroLightSVG && heroDarkSVG) {
      heroLightSVG.classList.add('hidden');
      heroDarkSVG.classList.remove('hidden');
    }
  } else {
    darkThemeBtn.classList.add('bg-slate-900');
    darkThemeBtn.classList.remove('bg-white');
    darkThemeBtn.dataset.theme = 'dark';
    if (heroLightSVG && heroDarkSVG) {
      heroLightSVG.classList.remove('hidden');
      heroDarkSVG.classList.add('hidden');
    }
  }
}

const toggleColorPlate = () => {
  colorPlate.classList.toggle('hidden');
  colorPlate.classList.toggle('flex');
  colorPlateBtn.classList.toggle('rotate-45');
};

changeThemeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const btnTheme = btn.dataset.theme;

    if (btnTheme === 'dark') {
      mainTheme = 'dark';
    } else if (btnTheme === 'light') {
      mainTheme = 'light';
    } else {
      colorTheme = btnTheme;
    }

    changeTheme();
    toggleColorPlate();
  });
});

colorPlateBtn.addEventListener('click', toggleColorPlate);
