import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function VerticalHoursChart() {
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

  const getChartData = () => {
    const categories = Object.keys(data);
    const billedHours = [];
    const nonBilledHours = [];
    const expectedHours = [];

    for (const category in data) {
      billedHours.push(data[category].billableHours + 30);
      nonBilledHours.push(data[category].nonBillableHours);
      expectedHours.push(data[category].expectedHours);
    }

    const originalLabels = categories;

    const modifiedLabels = originalLabels.map((label) => {
      return label.split(" ");
    });

    return {
      categories: modifiedLabels,
      billedHours: billedHours,
      nonBilledHours: nonBilledHours,
      expectedHours: expectedHours,
    };
  };

  const chartData = getChartData();

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
      type: "bar",
      height: 350,
      stacked: true,
    },
    stroke: {
      width: 0,
      colors: ["#0c9fe8"],
    },
    dataLables: {
      formatter: (val) => {
        return val / 1000 + "K";
      },
      offsetY: -20,
      style: {
        fontSize: "5px",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        rotate: 0,
      },
      title: {
        text: "Verticals",
        style: {
          fontSize: "20px",
        },
      },
    },

    colors: ["#0ce8c3", "#0ce84e", "#65cdf0"],
    yaxis: {
      title: {
        text: "Hours",
        style: {
          fontSize: "20px",
        },
      },
      labels: {
        formatter: (val) => {
          if (val < 1000) return val;
          return val / 1000 + "K";
        },
      },
    },
  };

  return (
    <div className="chart">
      <ReactApexChart
        options={options}
        series={[
          {
            name: "Non-Billed Hours",
            group: "Total Hours",
            data: chartData.nonBilledHours,
          },
          {
            name: "Billed Hours",
            group: "Total Hours",
            data: chartData.billedHours,
          },
          {
            name: "Expected Hours",
            group: "Expecteds Hours",
            data: chartData.expectedHours,
          },
        ]}
        type="bar"
        height={350}
        width={820}
      />
    </div>
  );
}

export default VerticalHoursChart;
