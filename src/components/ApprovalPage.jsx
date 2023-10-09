import { RiArrowDropDownLine } from "react-icons/ri"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SideNav from "./SideNav";
import axios from "axios";
import moment from 'moment';

export default function ApprovalPage() {

    let [isLoading, setIsLoading] = useState(true);
    let [secondaryLoading, setSecondaryLoading] = useState(false);
    let [render, setRender] = useState(0)
    const [cookies, setCookie] = useCookies(['token']);
    const [timesheets, setTimesheets] = useState([]);

    const pendingTimesheets = timesheets.filter((timesheet) => {
        return timesheet.status === "Pending";
    });

    useEffect(() => {
        setIsLoading(true)
        axios({
            method: "get",
            url: "http://localhost:4000/timesheet/manager",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setTimesheets(response.data.timesheets)
            setIsLoading(false)
        })
    }, [render])

    function handleAccept(timesheetID) {
        setSecondaryLoading(true)
        axios({
            method: "post",
            url: "http://localhost:4000/timesheet/status",
            data: {
                ID: timesheetID,
                status: "Accepted"
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setSecondaryLoading(false)
            setRender(render + 1);
        })
    }

    function handleReject(timesheetID) {
        setSecondaryLoading(true)
        axios({
            method: "post",
            url: "http://localhost:4000/timesheet/status",
            data: {
                ID: timesheetID,
                status: "Rejected"
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setSecondaryLoading(false)
            setRender(render + 1);
        })
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
            <div className="d-flex">
                <SideNav />
                <div className="table-container">
                    <div className="timesheet-header d-flex justify-content-between">
                        <h3 className="h2 m-2" style={{ fontWeight: "350", verticalAlign: 'middle' }}>Manager's Desk</h3>
                    </div>
                    <table className="table">
                        <thead>
                            <tr style={{ fontWeight: "600" }}>
                                <th scope="col" style={{ textAlign: "center" }}></th>
                                <th scope="col" style={{ textAlign: "center" }}>Time Period</th>
                                <th scope="col" style={{ textAlign: "center" }}>Project</th>
                                <th scope="col" style={{ textAlign: "center" }}>Member</th>
                                <th scope="col" style={{ textAlign: "center" }}>Total Hours</th>
                                <th scope="col" style={{ textAlign: "center" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingTimesheets.map((timesheet) => {

                                    const hours = timesheet.totalHours.reduce((accumulator, currentValue) => {
                                        return accumulator + currentValue;
                                    }, 0);

                                    return (
                                        <tr style={{ fontWeight: "350", verticalAlign: 'middle' }} key={timesheet._id}>
                                            <td style={{ textAlign: "center" }}><span><RiArrowDropDownLine size={24} /></span></td>
                                            <td scope=" d-flex" style={{ textAlign: "center" }}>{moment(timesheet.startDate).format("MMM D")} - {moment(timesheet.endDate).format("MMM D, YY")}</td>
                                            <td style={{ textAlign: "center" }}>{timesheet.projectName}</td>
                                            <td style={{ textAlign: "center" }}>{timesheet.name}</td>
                                            <td style={{ textAlign: "center" }}>{hours}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {!secondaryLoading && (
                                                    <button
                                                        className="btn btn-outline-success mx-1"
                                                        onClick={() => handleAccept(timesheet._id)}
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                {secondaryLoading && (
                                                    <button
                                                        disabled
                                                        className="btn btn-outline-success mx-1"
                                                        onClick={() => handleAccept(timesheet._id)}
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                {!secondaryLoading && (
                                                    <button
                                                        className="btn btn-outline-danger mx-1"
                                                        onClick={() => handleReject(timesheet._id)}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                {secondaryLoading && (
                                                    <button
                                                        disabled
                                                        className="btn btn-outline-danger mx-1"
                                                        onClick={() => handleReject(timesheet._id)}
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </td>


                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}