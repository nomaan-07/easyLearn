const sellAndExpenseStaticsChart = (labels, sellData, expenseData) => {
  const ctx = document.getElementById('sale-expense-chart').getContext('2d');

  const config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'فروش',
          data: sellData,
          borderWidth: 1,
          borderColor: 'rgba(5, 150, 105, 1)',
          backgroundColor: 'rgba(5, 150, 105, 0.2)',
          tension: 0.4,
          fill: 'origin',
          pointStyle: 'rectRounded',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'هزینه',
          data: expenseData,
          borderWidth: 1,
          borderColor: 'rgba(225, 29, 72, 1)',
          backgroundColor: 'rgba(225, 29, 72, 0.2)',
          tension: 0.4,
          fill: 'origin',
          pointStyle: 'rectRounded',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            useBorderRadius: true,
            borderRadius: 4,
            font: {
              size: 14,
              family: 'Vazir Medium',
            },
            color: '#94a3b8',
            boxWidth: 14,
          },
        },
        tooltip: {
          titleFont: {
            size: 16,
            family: 'Vazir Medium',
          },
          bodyFont: {
            size: 16,
            family: 'Vazir Medium',
          },
        },
      },
      locale: 'fa',
      scales: {
        x: {
          ticks: {
            font: {
              size: 10,
              family: 'Vazir Medium',
            },
            color: '#ca8a04',
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 10,
              family: 'Vazir Bold',
            },
            color: '#38bdf8',
          },
          title: {
            display: true,
            text: 'تومان',
            font: {
              size: 12,
              family: 'Vazir Bold',
            },
            color: '#94a3b8',
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

const ProfitAndlossStaticsChart = (labels, profitData, lossData) => {
  const newProfit = [...profitData];
  newProfit.forEach((data, index) => {
    newProfit[index] = data === 0 ? lossData[index] : newProfit[index];
  });

  const ctx = document.getElementById('profit-loss-chart').getContext('2d');
  const ctxMobile = document.getElementById('mobile-profit-loss-chart').getContext('2d');

  const config = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'سود',
          data: profitData,
          borderColor: 'rgba(5, 150, 105, 1)',
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: 'rgba(5, 150, 105, 0.2)',
          borderSkipped: false,
        },
        {
          label: 'زیان',
          data: lossData,
          borderColor: 'rgba(225, 29, 72, 1)',
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: 'rgba(225, 29, 72, 0.2)',
          borderSkipped: false,
        },
        {
          // Add a line chart dataset
          type: 'line', // Specify the dataset type as line
          label: 'روند سود',
          data: newProfit,
          borderWidth: 1,
          borderColor: 'rgba(129, 140, 248, 1)',
          backgroundColor: 'rgba(129, 140, 248, 0.2)',
          tension: 0.4,
          fill: false,
          pointRadius: 0,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            useBorderRadius: true,
            borderRadius: 4,
            font: {
              size: 14,
              family: 'Vazir Medium',
            },
            color: '#94a3b8',
            boxWidth: 14,
          },
        },
        tooltip: {
          titleFont: {
            size: 16,
            family: 'Vazir Medium',
          },
          bodyFont: {
            size: 16,
            family: 'Vazir Medium',
          },
        },
      },
      locale: 'fa',
      scales: {
        x: {
          ticks: {
            font: {
              size: 10,
              family: 'Vazir Medium',
            },
            color: '#ca8a04',
          },
          grid: { display: false },
        },
        y: {
          ticks: {
            font: {
              size: 10,
              family: 'Vazir Bold',
            },
            color: '#38bdf8',
          },
          title: {
            display: true,
            text: 'تومان',
            font: {
              size: 12,
              family: 'Vazir Bold',
            },
            color: '#94a3b8',
          },
          grid: {
            color: (ctx) => (ctx.tick.value === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent'),
          },
        },
      },
    },
  };

  const MobileConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'روند سود',
          data: newProfit,
          borderWidth: 1,
          borderColor: 'rgba(129, 140, 248, 1)',
          backgroundColor: 'rgba(129, 140, 248, 0.2)',
          tension: 0.4,
          fill: 'origin',
          pointStyle: 'rectRounded',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            useBorderRadius: true,
            borderRadius: 4,
            font: {
              size: 12,
              family: 'Vazir Medium',
            },
            color: '#94a3b8',
            boxWidth: 12,
          },
        },
        tooltip: {
          titleFont: {
            size: 16,
            family: 'Vazir Medium',
          },
          bodyFont: {
            size: 16,
            family: 'Vazir Medium',
          },
        },
      },
      locale: 'fa',
      scales: {
        x: {
          ticks: {
            font: {
              size: 10,
              family: 'Vazir Medium',
            },
            color: '#ca8a04',
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 10,
              family: 'Vazir Bold',
            },
            color: '#38bdf8',
          },
          title: {
            display: true,
            text: 'تومان',
            font: {
              size: 12,
              family: 'Vazir Bold',
            },
            color: '#94a3b8',
          },
          grid: {
            display: false,
          },
        },
      },
    },
  };

  new Chart(ctx, config);
  new Chart(ctxMobile, MobileConfig);
};

const months = ['اسفند ۱۴۰۲', 'فروردین ۱۴۰۳', 'اردیبهشت ۱۴۰۳', 'خرداد ۱۴۰۳', 'تیر ۱۴۰۳', 'مرداد ۱۴۰۳'];
const sellData = [207300000, 385000000, 308045000, 673390000, 493000000, 470000000];
const expenseData = [120900000, 340760000, 210000000, 545370000, 590000000, 440500000];
const profitData = [86400000, 44240000, 97955000, 130240000, 0, 29500000];
const lossData = [0, 0, 0, 0, -97000000, 0];

sellAndExpenseStaticsChart(months, sellData, expenseData);
ProfitAndlossStaticsChart(months, profitData, lossData);

export { sellAndExpenseStaticsChart, ProfitAndlossStaticsChart };
