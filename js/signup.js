const localStorageTheme = localStorage.getItem('theme');
if (localStorageTheme) {
  document.documentElement.className = `scroll-smooth ${localStorageTheme}`;
}

const form = document.querySelector('form');
const inputElements = document.querySelectorAll('input');

form.addEventListener('click', (event) => {
  if (event.target.matches('input')) {
    event.target.previousElementSibling.classList.add('animate-move-right-up');
    event.target.previousElementSibling.classList.remove('animate-move-right-down');
  }
});

inputElements.forEach((input) => {
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.previousElementSibling.classList.remove('animate-move-right-up');
      input.previousElementSibling.classList.add('animate-move-right-down');
    }
  });
});
