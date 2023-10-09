import { RiArrowDropDownLine } from "react-icons/ri"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import axios from "axios";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Projects from "./Projects";
import Timesheet from "./Timesheet";
import Header from "./Header";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Navbar from "./Navbar";

const steps = [
  'Creation date',
  'Project Manager',
  'Approved',
];

export default function HomePage() {  //

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  let [isLoading, setIsLoading] = useState(true);
  let [isDeleted, setIsDeleted] = useState(0);
  const [cookies, setCookie] = useCookies(['token']);
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: "get",
      url: "http://localhost:4000/timesheet/",
      headers: {
        'Authorization': `Bearer ${cookies.token}`,
      }
    }).then((response) => {
      setTimesheets(response.data.timesheets)
      setIsLoading(false)
    })
  }, [isDeleted])

  function handleDelete(timesheetID) {
    setIsLoading(true)
    axios({
      method: "delete",
      url: "http://localhost:4000/timesheet/",
      data: {
        _id: timesheetID
      },
      headers: {
        'Authorization': `Bearer ${cookies.token}`,
      }
    }).then((response) => {
      setIsDeleted(isDeleted + 1);
      setIsLoading(false)
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
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>

        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
            Raise a ticket
          </Button>
        </Modal.Footer>
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

      <Navbar/>
      <div className="d-flex homePage">
        <SideNav />
        <div className="table-container">
          <div className="timesheet-header d-flex justify-content-between">
            <h3 className="h2 m-2" style={{ fontWeight: "350", verticalAlign: 'middle' }}>My Timesheets</h3>
            <Link to="/create-timesheet">
              <button className="btn btn-outline-dark m-2">Create Timesheet</button>
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr style={{ fontWeight: "600" }}>
                <th scope="col">Time Period</th>
                <th scope="col">Project</th>
                <th scope="col">Total Hours</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="timesheetTable">
              {
                timesheets.map((timesheet) => {

                  const hours = timesheet.totalHours.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                  }, 0);

                  return (
                    
                    <tr onClick={handleShow} style={{ fontWeight: "350", verticalAlign: 'middle' }} key={timesheet._id}>
                      <td scope=" d-flex"> <span><RiArrowDropDownLine size={24} /></span> {moment(timesheet.startDate).format("MMM D")} - {moment(timesheet.endDate).format("MMM D, YY")}</td>
                      <td>{timesheet.projectName}</td>
                      <td>{hours}</td>
                      <td>{timesheet.status}</td>
                      <td>
                        {/* Add the dropdown menu */}
                        <div className="dropdown">
                          <button
                            className="btn"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby={`dropdownMenuButton${timesheet.projectID}`}
                          >
                            <li>
                              <a onClick={(e) => {
                                handleDelete(timesheet._id)
                              }} className="dropdown-item" href="#">
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
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