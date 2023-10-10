/* import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "./Navbar";
// import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import projectManager from "../images/projectManager.png"

export default function Projects() {
  const [modalShow, setModalShow] = useState(false);

  function MydModalWithGrid(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            L&D Training
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row className="mb-5">
              <Col xs={12} md={8}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Col>
              <Col xs={6} md={4}>
                
            <p>Project Manager</p>

            <img className="modal-icon" src={projectManager} alt="" />

              </Col>
            </Row>
          <div className="teamMember">
            <Row className="my-2">
              <Col xs={6} md={2}>
              <img className="modal-icon" src={projectManager} alt="" />

              </Col>
              <Col xs={6} md={6}>
                <h6>Vishal Jaiswal</h6>
                <p>Software Engineer Trainee</p>
                
              </Col>
              <Col xs={6} md={4}>
                <p>Delete</p>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={6} md={2}>
              <img className="modal-icon" src={projectManager} alt="" />

              </Col>
              <Col xs={6} md={6}>
                <h6>Vishal Jaiswal</h6>
                <p>Software Engineer Trainee</p>
                
              </Col>
              <Col xs={6} md={4}>
                <p>Delete</p>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={6} md={2}>
              <img className="modal-icon" src={projectManager} alt="" />

              </Col>
              <Col xs={6} md={6}>
                <h6>Vishal Jaiswal</h6>
                <p>Software Engineer Trainee</p>
                
              </Col>
              <Col xs={6} md={4}>
                <p>Delete</p>
              </Col>
            </Row>
            <Row className="my-2">
              <Col xs={6} md={2}>
              <img className="modal-icon" src={projectManager} alt="" />

              </Col>
              <Col xs={6} md={6}>
                <h6>Vishal Jaiswal</h6>
                <p>Software Engineer Trainee</p>
                
              </Col>
              <Col xs={6} md={4}>
                <p>Delete</p>
              </Col>
            </Row>
            </div>
            <Row>
              <h5>
                Add member
              </h5>
              <input type="email" placeholder="Enter email address"/>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [projects, setProjects] = useState([]);
  const [cookies, setCookie] = useCookies(["token"]);
  console.log(projects);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/project/resource",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then(
      function (response) {
        setProjects(response.data);
      },
      function (error) {
        console.log("error: ", error);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <SideNav />

        <div className="table-container p-5">
          <div className="row">
            {projects.map((project) => {
              return (
                <div onClick={() => setModalShow(true)} className="col-lg-4">
                  <div className="project-card1 shadow-lg text-center">
                    <h3 className="projectHeading ">{project.projectName}</h3>
                    <h3 className="projectSubheading">{project.id}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
 */