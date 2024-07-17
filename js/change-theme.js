const colorPlateBtn = document.querySelector('.color-plate-btn');
const colorPlate = document.querySelector('.color-plate');
const changeThemeButtons = document.querySelectorAll('.change-theme-btn');
const darkThemeBtn = document.querySelector('.change-theme-btn--dark');
const favIcon = document.querySelector('#favicon');
const toggleColorPlate = () => {
  colorPlate.classList.toggle('hide');
  colorPlate.classList.toggle('show');
  colorPlate.classList.toggle('translate-y-10');
  colorPlateBtn.classList.toggle('rotate-45');
};

const changeTheme = (event) => {
  const theme = event.target.dataset.theme;
  document.documentElement.className = theme;
  favIcon.href = `images/favIcons/${theme}-favicon-64x64.png`;
  toggleColorPlate();
  if (theme === 'dark') {
    darkThemeBtn.dataset.theme = 'light';
    darkThemeBtn.classList.remove('bg-slate-900');
    darkThemeBtn.classList.add('bg-white');
  } else {
    darkThemeBtn.classList.add('bg-slate-900');
    darkThemeBtn.classList.remove('bg-white');
    darkThemeBtn.dataset.theme = 'dark';
  }
};

changeThemeButtons.forEach((btn) => {
  btn.addEventListener('click', changeTheme);
});
colorPlateBtn.addEventListener('click', toggleColorPlate);
