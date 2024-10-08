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
    timer: 4000,
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
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

const confirmSweetAlert = async (message, confirmButtonText = 'بله', confirmButtonColor = '#e11d48') => {
  const response = await swal.fire({
    text: message,
    showConfirmButton: true,
    confirmButtonText,
    confirmButtonColor,
    focusConfirm: false,
    showDenyButton: true,
    denyButtonText: 'بازگشت',
    denyButtonColor: '#64748b',
    backdrop: true,
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
            animate__bounceOutLeft
            animate__faster
            `,
    },
    customClass: {
      container: 'confirm__notification',
    },
  });
  return response.isConfirmed;
};
export { sweetAlert, confirmSweetAlert };
