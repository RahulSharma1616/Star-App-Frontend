// Import necessary libraries 
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';

export default function TicketsStat() {

    //Set the baseURL
    const baseURL = process.env.NODE_ENV === 'production' ? 'https://3.108.23.98/API' : 'http://localhost:4000';

    const [cookies] = useCookies(['token']);
    const [data, setData] = useState({})

    useEffect(() => {
        axios({
            method: "get",
            url: baseURL + "/analytics/tickets",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {

            setData({
                labels: response.data.labels,
                datasets: [
                    {
                        label: ["Open vs Closed"],
                        backgroundColor: ["rgb(60, 123, 207)", "rgb(12, 173, 155)"],
                        borderColor: ["rgb(60, 123, 207)", "rgb(12, 173, 155)"],
                        data: response.data.data
                    }
                ]
            })
        })
    }, []);

    if (Object.keys(data).length === 0) {
        return <div>Loading...</div>; // Add a loading indicator until the data is fetched
    }

    return (
        <Pie data={data} />
    );
};
