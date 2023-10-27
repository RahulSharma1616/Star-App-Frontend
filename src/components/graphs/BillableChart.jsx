import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function BillableChart() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/analytics/getDataforPlotting")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const billableHours = Object.values(data).reduce(
    (a, b) => a + b.billableHours,
    100
  );
  const nonBillableHours = Object.values(data).reduce(
    (a, b) => a + b.nonBillableHours,
    0
  );
  const totalHours = billableHours + nonBillableHours;

  const billablePercentage = ((billableHours / totalHours) * 100).toFixed(2);
  const nonBillablePercentage = ((nonBillableHours / totalHours) * 100).toFixed(
    2
  );

  const series = [billablePercentage, nonBillablePercentage, totalHours];

  const options = {
    noData: {
      text: "Loading...",
      align: "center",
      verticalAlign: "middle",
      offsetY: 0,
      offsetX: 0,
      style: {
        color: "green",
        fontSize: "16px",
      },
    },
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#345678"],
    labels: ["Billable Hours", "Non-Billable Hours", "Total Hours"],
    legend: {
      show: true,
      floating: true,
      fontSize: "12px",
      position: "left",
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        if (seriesName === "Total Hours")
          return (
            seriesName +
            ":  " +
            opts.w.globals.series[opts.seriesIndex] +
            " hours"
          );
        return (
          seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + " %"
        );
      },
      itemMargin: {
        vertical: 1,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={300}
        width={390}
      />
    </div>
  );
}

export default BillableChart;
