import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';

export default function VerticalWorkTime() {

    const [cookies] = useCookies(['token']);
    const [data, setData] = useState({});

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:4000/analytics/vertical-time",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setData({
                labels: response.data.labels,
                datasets: [
                    {
                        label: 'Overtime',
                        data: response.data.greaterThanExpected,
                        backgroundColor: 'rgb(54, 162, 235, 0.51)',
                        borderColor: 'rgba(54, 162, 235, 1)', // Add the borderColor property here
                        borderWidth: 1, // You can specify the width of the border if needed
                    },
                    {
                        label: 'Undertime',
                        data: response.data.smallerThanExpected,
                        backgroundColor: 'rgba(255, 72, 0, 0.3)',
                        borderColor: 'rgba(255, 72, 0, 1)', // Add the borderColor property here
                        borderWidth: 1, // You can specify the width of the border if needed
                    },
                ],
            })
        })
    }, [])

    const options = {
        indexAxis: 'y', // or 'x'
        /* plugins: {
            title: {
                display: true,
                text: 'Stacked Bar Chart Example',
            },
        }, */
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    if (Object.keys(data).length === 0) {
        return <div>Loading...</div>; // Add a loading indicator until the data is fetched
    }

    return (
        <Bar data={data} options={options} />
    );
};
