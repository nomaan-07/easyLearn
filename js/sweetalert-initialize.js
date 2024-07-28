const sweetAlert = (message, type) => {
  let icon = null;
  let iconColorClasses = null;
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

  Swal.fire({
    html: `
      <div class="notification__container">
        <div class="notification__content">
          <svg class="notification__icon ${iconColorClasses}">
            <use href="#${icon}"></use>
          </svg>
          <span>${message}</span>
        </div>
      </div>`,
    position: 'top-start',
    width: 'fit-content',
    showConfirmButton: false,
    timer: 100000,
    timerProgressBar: true,
    backdrop: false,
    customClass: {
      htmlContainer: 'notification',
      container: 'notification__container',
      popup: 'notification__content',
      icon: 'notification__icon',
      timerProgressBar: 'notification-timer-progress-bar',
    },
    showClass: {
      popup: `
        animate__animated
        animate__bounceInRight
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__bounceOutRight
        `,
    },
  });
};

export { sweetAlert };
