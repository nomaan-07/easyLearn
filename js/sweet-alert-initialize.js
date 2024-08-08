const sweetAlert = (message, type, btn = false) => {
  let icon = null;
  let iconColorClasses = null;

  let confirmBtn = false;
  let alertTimer = 4000;
  let alertPosition = 'top-start';
  let showAnimation = 'animate__bounceInRight';
  let hideAnimation = 'animate__bounceOutRight';

  if (type === 'success') {
    icon = 'check-badge';
    iconColorClasses = 'text-green-600 dark:text-green-400';
  } else if (type === 'failed') {
    icon = 'x-circle';
    iconColorClasses = 'text-rose-500';
  } else if (type === 'info') {
    icon = 'information-circle';
    iconColorClasses = 'text-yellow-500';
  }

  if (btn) {
    confirmBtn = true;
    alertTimer = false;
    alertPosition = 'center';
    showAnimation = 'animate__fadeIn';
    hideAnimation = 'animate__fadeOut';
  }

  Swal.fire({
    html: `
      <div class="notification__container">
        <div class="notification__content">
          <svg class="notification__icon ${iconColorClasses}">
            <use href="#${icon}"></use>
          </svg>
          <span>${message}</span>
        </div>
        <div class="notification__btn-wrapper">
          <div class="notification__confirm-btn"></div>
        </div>
      </div>`,
    position: alertPosition,
    width: 'fit-content',
    showConfirmButton: confirmBtn,
    confirmButtonText: 'تایید',
    timer: alertTimer,
    timerProgressBar: true,
    backdrop: false,
    customClass: {
      htmlContainer: 'notification',
      container: 'notification__container',
      popup: 'notification__content',
      icon: 'notification__icon',
      timerProgressBar: 'notification-timer-progress-bar',
      confirmButton: 'notification__confirm-btn',
      actions: 'notification__btn-wrapper',
    },
    showClass: {
      popup: `
        animate__animated
        ${showAnimation}
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        ${hideAnimation}
        `,
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export { sweetAlert };
