import { sweetAlert } from './sweet-alert-initialize.js';

const emptyValueValidation = (value) => {
  if (value !== '') return true;
  return false;
};

const usernameValidation = (username) => {
  const regex = /[A-Za-z0-9_]+/;
  if (!regex.test(username)) return 'char';
  if (username.length > 12 || username.length < 4) return 'length';
  return true;
};

const emailValidation = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const passwordValidation = (password) => {
  if (password.length >= 8) return true;
  return false;
};

// signup.js
const signupFormValidation = (username, email, password, allUsers) => {
  const isUsernameEmpty = !emptyValueValidation(username);
  const isEmailEmpty = !emptyValueValidation(email);
  const isPasswordEmpty = !emptyValueValidation(password);
  let allUsernames = allUsers.find((user) => user.username === username);
  let allEmails = allUsers.find((user) => user.email === email);

  if (isUsernameEmpty && isEmailEmpty && isPasswordEmpty) {
    sweetAlert('لطفا نام کاربری،‌ ایمیل و رمز عبور را وارد کنید.', 'failed');
  } else if (isUsernameEmpty && isEmailEmpty) {
    sweetAlert('لطفا نام کاربری و ایمیل را وارد کنید.', 'failed');
  } else if (isUsernameEmpty && isPasswordEmpty) {
    sweetAlert('لطفا نام کاربری و رمز عبور را وارد کنید.', 'failed');
  } else if (isEmailEmpty && isPasswordEmpty) {
    sweetAlert('لطفا ایمیل و رمز عبور را وارد کنید.', 'failed');
  } else if (isUsernameEmpty) {
    sweetAlert('لطفا نام کاربری را وارد کنید.', 'failed');
  } else if (isEmailEmpty) {
    sweetAlert('لطفا ایمیل را وارد کنید.', 'failed');
  } else if (isPasswordEmpty) {
    sweetAlert('لطفا رمز عبور را وارد کنید.', 'failed');
  } else if (usernameValidation(username) === 'char') {
    sweetAlert('در نام کاربری فقط استفاده از حروف انگلیسی، اعداد و _(آندرلاین) مجاز است.', 'failed');
  } else if (usernameValidation(username) === 'length') {
    sweetAlert('نام کاربری باید بین ۴ تا ۱۲ کاراکتر باشد.', 'failed');
  } else if (!emailValidation(email)) {
    sweetAlert('لطفا ایمیل را به درستی وارد کنید.', 'failed');
  } else if (!passwordValidation(password)) {
    sweetAlert('رمز عبور باید حداقل ۸ کاراکتر باشد.', 'failed');
  } else if (allUsernames) {
    sweetAlert('نام کاربری قبلا انتخاب شده است.', 'failed');
  } else if (allEmails) {
    sweetAlert('این ایمیل قبلا ثبت نام کرده است.', 'failed');
  } else {
    sweetAlert('ثبت نام با موفقیت انجام شد.', 'success');
    return true;
  }
  return false;
};

export { emptyValueValidation, emailValidation, passwordValidation, signupFormValidation };
