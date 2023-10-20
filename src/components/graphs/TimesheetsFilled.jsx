import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

export default function TimesheetsFilled() {

    const labels = ["January", "February", "March", "April", "May"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30],
            },
        ],
    };

    useEffect(() => {

    }, []);

    return (
        <div style={{ width: '50%' }}>

        </div>
    );
};
