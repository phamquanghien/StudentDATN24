import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart: React.FC = () => {
  const options: ApexCharts.ApexOptions = {
    series: [
      {
        name: 'K63',
        data: [44, 55, 41, 37],
      },
      {
        name: 'K64',
        data: [44, 55, 41, 37],
      },
      {
        name: 'K65',
        data: [33, 32, 33, 52],
      },
      {
        name: 'Khác',
        data: [90, 70, 51, 86],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '16px',
              fontWeight: 500,
            },
          },
        },
        columnWidth: '22px',
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },

    xaxis: {
      categories: [2021, 2022, 2023, 2024],

      labels: {
        // formatter: function (val: any) {
        //   return val + 'K';
        // },
        // fontSize: '16px',
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      // y: {
      //   formatter: function (val: any) {
      //     return val + 'K';
      //   },
      // },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '16px',
      offsetX: 40,
    },
  };

  return (
    <div className='bg-white drop-shadow-md rounded-xl mt-4 w-3/4'>
      <h1 className='text-lg p-4  '>Số lượng sinh viên thực tập theo khóa</h1>
      <Chart
        options={options}
        series={options.series}
        type='bar'
        height={'300px'}
      />
    </div>
  );
};

export default ColumnChart;
