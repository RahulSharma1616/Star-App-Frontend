import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function ManagersChart() {
  const [options, setOptions] = useState({
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
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      title: {
        text: "Hours",
        style: {
          fontSize: "20px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Managers",
        style: {
          fontSize: "20px",
        },
      },
      categories: [], // Initialize with an empty array
    },
  });

  const [data, setData] = useState([
    {
      name: "Actual Hours",
      data: [],
    },
    {
      name: "Expected Hours",
      data: [],
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/analytics/getDataOfManagers") // Replace with your actual API endpoint
      .then((response) => {
        const managersData = response.data.managersData;

        const managerNames = [];
        const expectedHours = [];
        const actualHours = [];

        for (const key in managersData) {
          const data = managersData[key];
          managerNames.push(data.manager);
          actualHours.push(data.hours);
          expectedHours.push(data.expectedHours);
        }

        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: {
            ...prevOptions.yaxis,
          },
          xaxis: {
            categories: managerNames,
          },
        }));

        setData([
          {
            name: "Actual Hours",
            data: actualHours,
          },
          {
            name: "Expected Hours",
            data: expectedHours,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="horizontal-bar-chart">
      <ReactApexChart
        options={options}
        series={data}
        type="bar"
        height={350}
        width={510}
      />
    </div>
  );
}

export default ManagersChart;
