import { useEffect, useState } from "react";
import moment from 'moment';
import axios from "axios";
import { useCookies } from 'react-cookie';
import Calendar from 'react-calendar';
import { Link, Navigate, useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';

export default function Timesheet() {

    const navigation = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['token']);

    const [date, setDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const dateContainer = [];

    let [message, setMessage] = useState("")
    let [enableButton, setEB] = useState(false)

    moment.updateLocale(moment.locale(), {
        week: {
            dow: 1, // 1 = Monday
        },
    });

    const openCalendar = (e) => {
        e.stopPropagation(); // Prevent click event from propagating to document
        setIsCalendarOpen(true);
    };

    const closeCalendar = () => {
        setIsCalendarOpen(false);
    };

    const handleCalendarClick = (e) => {
        e.stopPropagation(); // Prevent click event from propagating to document
        setDateChange(dateChange + 1)
        setProjectInputValues({})
    };

    const handleDateChange = (newDate) => {
        // Handle date change logic here
        setDate(newDate);
        setCurrentWeekStartDate(moment(newDate).startOf("week"));
        closeCalendar();

        //console.log(moment(moment(newDate).format("DD-MM-YYYY")))
    };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        axios({
            method: "get",
            url: "http://localhost:4000/project/resource",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then(function (response) {
            setProjects(response.data)
            setIsLoading(false)
        }, function (error) {
            console.log("error: ", error)
            setIsLoading(false)
        })
    }, []);

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(moment().startOf('week'));

    function prevWeek() {
        setCurrentWeekStartDate(currentWeekStartDate.clone().subtract(1, 'week'));
        setDateChange(dateChange + 1)
        setProjectInputValues({})
    }

    function nextWeek() {
        setCurrentWeekStartDate(currentWeekStartDate.clone().add(1, 'week'));
        setDateChange(dateChange + 1)
        setProjectInputValues({})
    }

    const renderWeekDates = () => {
        const dates = [];

        const startOfWeek = currentWeekStartDate.clone().startOf('week');
        const endOfWeek = currentWeekStartDate.clone().endOf('week');

        while (startOfWeek.isSameOrBefore(endOfWeek)) {
            dates.push(startOfWeek.format('dddd DD-MMM-YY'));
            dateContainer.push(startOfWeek.format("YYYY-MM-DD"))
            startOfWeek.add(1, 'day');
        }

        return dates.map(date => {

            const day = date.split(" ")

            return (
                <td key={date}><span style={{ fontWeight: "600" }}>{day[0]}</span><br /><span style={{ fontWeight: "400" }}>{day[1]}</span></td>
            )
        });
    };

    let [dateChange, setDateChange] = useState(0)
    let [hours, setHours] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios({
            method: "post",
            url: "http://localhost:4000/timesheet/getAttendance",
            data: {
                date: dateContainer[0]
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {

            setIsLoading(false)

            if (response.data.length != 0) {
                setEB(true)
            }

            setHours(response.data.map((item) => {
                return {
                    projectID: item.projectID,
                    hours: item.hours
                }
            }))
        }, (error) => {
            setIsLoading(false)
            console.log("error: ", error)
        })

    }, [dateChange])

    useEffect(() => {
        let temp = hours.map((item) => {
            return {
                [item.projectID]: item.hours
            }
        })

        let mergedValues = { ...projectInputValues }; // Create a copy of the existing object

        temp.forEach((item) => {
            for (let key in item) {
                mergedValues[key] = item[key]; // Merge each key-value pair into the object
            }
        });

        setProjectInputValues(mergedValues);
    }, [hours])

    const [projectInputValues, setProjectInputValues] = useState({});
    let [comment, setComment] = useState("")

    // Function to update input values for a specific project
    function handleInputChange(projectID, dayIndex, value) {

        setEB(true)

        // Copy the current input values
        const updatedInputValues = { ...projectInputValues };

        // Get or create the project's input values object
        if (!updatedInputValues[projectID]) {
            updatedInputValues[projectID] = Array(7).fill(0);
        }

        // Update the input value for the specific day
        updatedInputValues[projectID][dayIndex] = value;

        // Update the state
        setProjectInputValues(updatedInputValues);
    }

    function handleComment(event) {
        setComment(event.target.value)
    }

    function handleSave() {
        setIsLoading(true)
        axios({
            method: "post",
            url: "http://localhost:4000/timesheet/saveAttendance",
            data: {
                weekStartDate: dateContainer[0],
                hours: projectInputValues
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setIsLoading(false)
            setMessage(response.data.message)
        }, (error) => {
            setIsLoading(false)
            setMessage(error.message)
            console.log("error: ", error)
        })
    }

    function handleSubmit() {
        setIsLoading(true)
        axios({
            method: "post",
            url: "http://localhost:4000/timesheet/submitTimesheet",
            data: {
                weekStartDate: dateContainer[0],
                hours: projectInputValues,
                comment: comment
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setIsLoading(false)
            setMessage(response.data.message)
        }, (error) => {
            setIsLoading(false)
            setMessage(error.message)
            console.log("error: ", error)
        })

        //navigation("/home")
    }

    return (
        <>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-between p-4">
                <span className="h1" style={{ fontWeight: "350", verticalAlign: 'middle' }}>Create Timesheet</span>

                <span>
                    <button style={{ padding: "2px 12px 10px 12px" }} className="btn btn-outline-dark calander-btn m-1" onClick={openCalendar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                            <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                    </button>
                    {isCalendarOpen && (
                        <div className="calendar-overlay" onClick={handleCalendarClick}>
                            <div className={`calendar-container`}>
                                <Calendar className={`${isCalendarOpen ? 'calendar-active' : ''}`} onChange={handleDateChange} value={date} />
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-dark m-3" onClick={closeCalendar}>Back to Timesheet</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button onClick={prevWeek} className="btn btn-outline-dark m-1">Previous Week</button>
                    <button onClick={nextWeek} className="btn btn-outline-dark m-1">Next Week</button>
                </span>
            </div>
            {message != "" && <div className="p-4">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    <strong> {message}</strong>
                    <button onClick={() => {
                        setMessage("")
                    }} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>}
            <table className="table">
                <thead className="table-secondary">
                    <tr>
                        <th style={{ fontSize: "26px", fontWeight: "350", verticalAlign: 'middle' }} scope="col">Projects</th>
                        {renderWeekDates()}
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(project => {

                            let projectHours = []

                            let data = projectInputValues[project._id] ?? []

                            if (data.length == 0) {
                                projectHours = Array(7).fill(0);
                            } else {
                                projectHours = data
                            }

                            return (
                                <tr key={project.id}>
                                    <th className="p-3 projectName" style={{ fontWeight: "350", verticalAlign: 'middle' }}>
                                        {project.projectName}
                                        <br />
                                        {project.id}
                                    </th>
                                    {
                                        projectHours && projectHours.map((pHour, dayIndex) => {
                                            return (
                                                <td key={dayIndex} className="col-xs-2">
                                                    <input type="number" value={pHour} onChange={
                                                        (e) => {
                                                            if (e.target.value > 24 ||  e.target.value < 0) {
                                                                setMessage("Enter a valid value!");
                                                            } else {
                                                                handleInputChange(project._id, dayIndex, e.target.value)
                                                            }
                                                        }
                                                    } className={`timesheet-input shadow ${pHour < 0 || pHour > 24 ? 'is-invalid' : ''}`} min="0" max="24" />
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="p-4">
                <textarea onChange={handleComment} className="form-control border border-secondary" placeholder="Add Comments" rows="3"></textarea>
            </div>
            {enableButton && <div className="d-flex justify-content-end p-4">
                <button onClick={handleSave} className="btn btn-outline-dark m-1">Save</button>
                <button onClick={handleSubmit} className="btn btn-dark m-1">Submit</button>
            </div>}
            {!enableButton && <div className="d-flex justify-content-end p-4">
                <button disabled onClick={handleSave} className="btn btn-outline-dark m-1">Save</button>
                <button disabled onClick={handleSubmit} className="btn btn-dark m-1">Submit</button>
            </div>}
        </>
    );
}
