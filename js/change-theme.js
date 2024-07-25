const allElements = document.querySelectorAll('*');
const colorPlateBtn = document.querySelector('.color-plate-btn');
const colorPlate = document.querySelector('.color-plate');
const changeThemeButtons = document.querySelectorAll('.change-theme-btn');
const darkThemeBtn = document.querySelector('.change-theme-btn--dark');
const favIcon = document.querySelector('#favicon');
const heroLightSVG = document.querySelector('.hero-light-svg');
const heroDarkSVG = document.querySelector('.hero-dark-svg');

const setThemeFromLocalStorage = () => {
  const localStorageTheme = localStorage.getItem('theme');
  localStorageTheme && changeTheme(localStorageTheme);
};
setThemeFromLocalStorage();

const toggleColorPlate = () => {
  colorPlate.classList.toggle('hidden');
  colorPlate.classList.toggle('flex');
  colorPlateBtn.classList.toggle('rotate-45');
};

function changeTheme(theme) {
  // Set all elements transition to none
  allElements.forEach((el) => el.classList.add('transition-none'));
  document.documentElement.className = `scroll-smooth ${theme}`;

  localStorage.setItem('theme', theme);

  favIcon.href = `images/favIcons/${theme}-favicon-64x64.png`;

  if (theme === 'dark') {
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

    // apply the changes immediately by forcing reflow
    document.body.offsetHeight;
    // remove transition none form elements
    allElements.forEach((el) => el.classList.remove('transition-none'));
  }
}

changeThemeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    changeTheme(theme);
    toggleColorPlate();
  });
});

colorPlateBtn.addEventListener('click', toggleColorPlate);
