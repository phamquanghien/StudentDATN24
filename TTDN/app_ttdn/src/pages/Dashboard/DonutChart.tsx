import React from "react";
import Chart from "react-apexcharts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

const DonutChart: React.FC = () => {
  const dispatch = useDispatch();

  const { counts } = useSelector(
    (state: RootState) => ({
      counts: state.Dashboard.counts.data,
    }),
    shallowEqual,
  );

  // useEffect(() => {
  //   dispatch(getCountsRequest());
  // }, [dispatch]);

  const data = [
    {
      name: "Hoàn thành",
      value: counts?.done,
    },
    {
      name: "Đang thực tập",
      value: counts?.during + counts?.waiting,
    },
    {
      name: "Không hoàn thành",
      value: counts?.failed,
    },
    {
      name: "Mới",
      value: counts?.newCount,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    // borderWidth: 0,
    series: data.map((e) => e.value),
    colors: [
      "#52c93f",
      "#0403f3",
      "#ff2727",
      "#ef1ae5",
      "#e3e90d",
      "#0de5e9",
      "#e9b50d",
    ],
    dataLabels: { enabled: true },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: "Tổng",
            },
          },
        },
        startAngle: 0,
        endAngle: 360,
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      // verticalAlign: 'middle',
      floating: false,
      fontSize: "16px",
      offsetX: 0,
      offsetY: -10,
      height: 60,
    },
    labels: data.map((e) => e.name),
  };

  return (
    <div className="bg-white drop-shadow-md rounded-xl mt-4 w-1/4 flex flex-col flex-1">
      <h1 className="text-lg py-4 text-center">Tỉ lệ hoàn thành thực tập</h1>
      <Chart
        options={options}
        series={options.series}
        type="donut"
        height={"300px"}
      />
    </div>
  );
};

export default DonutChart;
