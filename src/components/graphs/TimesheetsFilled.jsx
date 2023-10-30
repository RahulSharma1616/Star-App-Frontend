// Import necessary libraries 
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';

export default function TimesheetsFilled() {

    const [cookies] = useCookies(['token']);
    const [data, setData] = useState({})

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:4000/analytics/timesheets-filled",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {

            setData({
                labels: ["% Timesheets Filled"], // Labels for the x-axis
                datasets: [
                    {
                        label: "Filled On-Time",
                        data: [response.data.data[0]],
                        backgroundColor: 'rgb(54, 162, 235, 0.51)', // Customize the color as needed
                        borderColor: 'rgb(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: "Not Filled On-Time",
                        data: [response.data.data[1]],
                        backgroundColor: 'rgba(255, 72, 0, 0.3)', // Customize the color as needed
                        borderColor: 'rgba(255, 72, 0, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        })
    }, []);

    if (Object.keys(data).length === 0) {
        return <div>Loading...</div>; // Add a loading indicator until the data is fetched
    }

    return (
        <Bar data={data} />
    );
};
