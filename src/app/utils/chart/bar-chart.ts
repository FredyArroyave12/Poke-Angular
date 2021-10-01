import { ChartDataSets, ChartOptions } from 'chart.js';

export const barChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

export const barChartPrimaryStyle: ChartDataSets = {
  backgroundColor: '#cb3234',
  borderColor: '#cb3234',

  borderWidth: 5,
};

export const barChartSecondaryStyle: ChartDataSets = {
  backgroundColor: '#3b83bd',
  borderColor: '#3b83bd',

  borderWidth: 5,
};
