import { sweetAlert } from './../initializers/sweet-alert-initialize.js';

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

// auth.js
const signupFormValidation = (username, email, password, allUsers) => {
  const isUsernameEmpty = !emptyValueValidation(username);
  const isEmailEmpty = !emptyValueValidation(email);
  const isPasswordEmpty = !emptyValueValidation(password);
  let dbUsername = allUsers.find((user) => user.username === username);
  let dbEmail = allUsers.find((user) => user.email === email);

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
  } else if (dbUsername) {
    sweetAlert('نام کاربری قبلا انتخاب شده است.', 'failed');
  } else if (dbEmail) {
    sweetAlert('این ایمیل قبلا ثبت نام کرده است.', 'failed');
  } else {
    sweetAlert('ثبت نام با موفقیت انجام شد.', 'success');
    return true;
  }
  return false;
};

// auth.js
const loginFormValidation = (email, password, user) => {
  const isEmailEmpty = !emptyValueValidation(email);
  const isPasswordEmpty = !emptyValueValidation(password);

  if (isEmailEmpty && isPasswordEmpty) {
    sweetAlert('لطفا ایمیل و رمز عبور را وارد کنید.', 'failed');
  } else if (isEmailEmpty) {
    sweetAlert('لطفا ایمیل را وارد کنید.', 'failed');
  } else if (isPasswordEmpty) {
    sweetAlert('لطفا رمز عبور را وارد کنید.', 'failed');
  } else if (!emailValidation(email)) {
    sweetAlert('لطفا ایمیل را به درستی وارد کنید.', 'failed');
  } else if (!user) {
    sweetAlert('کاربری با این ایمیل یافت نشد.', 'failed');
  } else if (user.password !== password) {
    sweetAlert('رمز عبور اشتباه است.', 'failed');
  } else {
    sweetAlert(`${user.username} عزیز، ورود موفقیت آمیز بود.`, 'success');
    return true;
  }
  return false;
};

const accountChangeDetailFormValidation = (username, email, allUsers) => {
  let dbUsername = allUsers.find((user) => user.username === username);
  let dbEmail = allUsers.find((user) => user.email === email);

  let isUsernameValid = true;
  let isEmailValid = true;

  // Validate username
  if (emptyValueValidation(username)) {
    isUsernameValid = false;
    if (usernameValidation(username) === 'char') {
      sweetAlert('در نام کاربری فقط استفاده از حروف انگلیسی، اعداد و _(آندرلاین) مجاز است.', 'failed');
    } else if (usernameValidation(username) === 'length') {
      sweetAlert('نام کاربری باید بین ۴ تا ۱۲ کاراکتر باشد.', 'failed');
    } else if (dbUsername) {
      sweetAlert('نام کاربری قبلا انتخاب شده است.', 'failed');
    } else {
      isUsernameValid = true;
    }
  }

  // Validate email
  if (emptyValueValidation(email)) {
    isEmailValid = false;
    if (!emailValidation(email)) {
      sweetAlert('لطفا ایمیل را به درستی وارد کنید.', 'failed');
    } else if (dbEmail) {
      sweetAlert('این ایمیل در سایت ثبت نام کرده است.', 'failed');
    } else {
      isEmailValid = true;
    }
  }

  isEmailValid && isUsernameValid && sweetAlert(`مشخصات با موفقیت تغییر یافت.`, 'success');
  return isEmailValid && isUsernameValid;
};

const accountChangePasswordFormValidation = (currentPassword, newPassword, user) => {
  const isCurrentPasswordEmpty = !emptyValueValidation(currentPassword);
  const isNewPasswordEmpty = !emptyValueValidation(newPassword);

  if (isCurrentPasswordEmpty) {
    sweetAlert('لطفا رمز عبور فعلی را وارد کنید.', 'failed');
  } else if (isNewPasswordEmpty) {
    sweetAlert('لطفا رمز عبور جدید را وارد کنید.', 'failed');
  } else if (currentPassword !== user.password) {
    sweetAlert('رمز عبور فعلی اشتباه است.', 'failed');
  } else if (!passwordValidation(newPassword)) {
    sweetAlert('رمز عبور باید حداقل ۸ کاراکتر باشد.', 'failed');
  } else {
    sweetAlert('رمز عبور با موفقیت تغییر یافت.', 'success');
    return true;
  }
  return false;
};

const newTicketValidation = (department, subject, content) => {
  const isSubjectEmpty = !emptyValueValidation(subject);
  const isContentEmpty = !emptyValueValidation(content);

  if (department === 'none' && isSubjectEmpty && isContentEmpty) {
    sweetAlert('لطفا دپارتمان، موضوع و متن تیکت را وارد کنید.', 'failed');
  } else if (department === 'none' && isSubjectEmpty) {
    sweetAlert('لطفا دپارتمان و موضوع را وارد کنید.', 'failed');
  } else if (department === 'none' && isContentEmpty) {
    sweetAlert('لطفا دپارتمان و متن تیکت را وارد کنید.', 'failed');
  } else if (isSubjectEmpty && isContentEmpty) {
    sweetAlert('لطفا موضوع و متن تیکت را وارد کنید.', 'failed');
  } else if (department === 'none') {
    sweetAlert('لطفا دپارتمان را انتخاب کنید.', 'failed');
  } else if (isSubjectEmpty) {
    sweetAlert('لطفا موضوع تیکت را بنویسید.', 'failed');
  } else if (isContentEmpty) {
    sweetAlert('لطفا متن تیکت را بنویسید.', 'failed');
  } else {
    return true;
  }
  return false;
};

export { emptyValueValidation, emailValidation, passwordValidation, signupFormValidation, loginFormValidation, accountChangeDetailFormValidation, accountChangePasswordFormValidation, newTicketValidation };
