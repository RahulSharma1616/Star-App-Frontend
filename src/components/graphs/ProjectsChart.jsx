import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function ProjectChart() {
  const [data, setData] = useState([]);
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
      id: "project-chart",
    },
    xaxis: {
      labels: {
        rotate: 0,
      },
      categories: [],
      title: {
        text: "Projects",
        style: {
          fontSize: "20px",
        },
      },
    },
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
    colors: ["#40c0f7", "#0cad9b"],
  });

  useEffect(() => {
    // Make an Axios call to get project data
    axios
      .get("http://localhost:4000/analytics/getDataOfProjects") // Replace with your actual API endpoint
      .then((response) => {
        const projectArray = response.data.projectArray;
        const projectNames = [];
        const projectHours = [];
        const expectedHours = [];

        for (const key in projectArray) {
          const project = projectArray[key];
          if (project.projectName.toLowerCase().includes("holiday")) {
          } else {
            projectNames.push(project.projectName.split(" "));
            projectHours.push(project.hours);
            expectedHours.push(project.expectedHours);
          }
        }

        setData([
          { name: "Actual Hours", data: projectHours },
          { name: "Expected Hours", data: expectedHours },
        ]);
        setOptions({
          ...options,
          xaxis: { categories: projectNames },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="project-chart">
      <ReactApexChart
        options={options}
        series={data}
        type="bar"
        height={350}
        width={820}
      />
    </div>
  );
}

export default ProjectChart;
