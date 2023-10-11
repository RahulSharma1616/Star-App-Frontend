import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from 'react-bootstrap/Modal';
import SideNav from "./SideNav";
import axios from "axios";
import Navbar from "./Navbar";
import moment from 'moment';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function ApprovalPage() {

    const [selectedTimesheet, setSelectedTimesheet] = useState(null);
    const [level, setLevel] = useState(1);

    const steps = selectedTimesheet
        ? [`Submitted on ${moment(selectedTimesheet.submissionDate).format('MMM D, YYYY')}`, `Project Manager\n${selectedTimesheet.status}`, 'Approved']
        : ['Manager Approval', 'Approved'];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function to handle row click and set submission date
    const handleRowClick = (timesheet) => {
        setSelectedTimesheet(timesheet);

        if (timesheet.status == "Accepted") {
            setLevel(3);
        }

        else if (timesheet.status == "Rejected") {
            setLevel(1);
        }

        //setSubmissionDate(moment(timesheet.submissionDate).format('MMM D, YYYY'));
        handleShow(); // Open the modal
    };

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

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={level} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: "center" }}>Date</th>
                                <th scope="col" style={{ textAlign: "center" }}>Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTimesheet && selectedTimesheet.totalHours.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: "center" }}>{moment(selectedTimesheet.startDate).clone().add(index, 'days').format('MMM DD, YYYY')}</td>
                                    <td style={{ textAlign: "center" }}>{item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Footer>
                {selectedTimesheet && <div className="d-flex justify-content-around m-2 p-2">
                        <span>
                            <strong>Total Hours:</strong> {selectedTimesheet.totalHours.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue;
                            }, 0)}
                        </span>
                        <br/>
                        <span>
                            <strong>Expected Hours:</strong> {selectedTimesheet.expectedHours}
                        </span>
                    </div>}
            </Modal>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            <Navbar />
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
                                            <td className="clickable-cell" onClick={() => handleRowClick(timesheet)} style={{ textAlign: "center" }}><span><FcInfo size={24} /></span></td>
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