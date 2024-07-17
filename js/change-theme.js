const colorPlateBtn = document.querySelector('.color-plate-btn');
const colorPlate = document.querySelector('.color-plate');
const changeThemeButtons = document.querySelectorAll('.change-theme-btn');
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
};

changeThemeButtons.forEach((btn) => {
  btn.addEventListener('click', changeTheme);
});
colorPlateBtn.addEventListener('click', toggleColorPlate);
