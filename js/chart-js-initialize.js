const sellAndExpenseStaticsChart = (labels, expenseData, sellData) => {
  const ctx = document.getElementById('login-signup-chart').getContext('2d');
  const config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'فروش',
          data: expenseData,
          borderColor: 'rgba(5, 150, 105, 1)',
          backgroundColor: 'rgba(5, 150, 105, 0.2)',
          tension: 0.4,
          fill: 'origin',
        },
        {
          label: 'هزینه',
          data: sellData,
          borderColor: 'rgba(225, 29, 72, 1)',
          backgroundColor: 'rgba(225, 29, 72, 0.2)',
          tension: 0.4,
          fill: 'origin',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16,
              family: 'Vazir Medium',
            },
          },
        },
      },
      locale: 'fa',
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
              family: 'Vazir Bold',
            },
          },
          title: {
            display: true,
            text: 'ماه‌ها',
            font: {
              size: 20,
              family: 'Vazir Bold',
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: 14,
              family: 'Vazir Bold',
            },
          },
          title: {
            display: true,
            text: 'تومان',
            font: {
              size: 20,
              family: 'Vazir Bold',
            },
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };

  new Chart(ctx, config);
};

const labels = ['شهریور', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'];
const expenseData = [207300, 385000, 308045, 673390, 493000, 470000];
const sellData = [120900, 340760, 210000, 545370, 590000, 440500];
sellAndExpenseStaticsChart(labels, expenseData, sellData);

export { sellAndExpenseStaticsChart };
