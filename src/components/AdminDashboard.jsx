import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from 'react-modal';
import axios from "axios";
import SideNav from "./SideNav";
import CreateProject from "./CreateProject";
import CreateAccount from "./CreateAccount";
import Navbar from "./Navbar";

export default function AdminDashboard() {

    let [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['token']);

    const [projectModal, setProjectModal] = useState(false);

    const openProjectModal = () => {
        setProjectModal(true);
    };

    const closeProjectModal = () => {
        setProjectModal(false);
    };

    const [userModal, setUserModal] = useState(false);

    const openUserModal = () => {
        setUserModal(true);
    };

    const closeUserModal = () => {
        setUserModal(false);
    };

    useEffect(() => {

        setIsLoading(false);
    }, [])

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
            <Navbar />
            <div className="d-flex">
                <div className="row">
                    <div className="col-lg-1 mt-6">
                <SideNav />
                </div>
                <div className="table-container">
                    <div className="timesheet-header d-flex justify-content-between">
                        <h3 className="h2 m-2" style={{ fontWeight: "350", verticalAlign: 'middle' }}>Admin's Desk</h3>
                    </div>
                    <div className="row p-4">
                        <div className="col-sm-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pb-4" style={{ textAlign: "center" }}>
                                        <h5 className="card-title">User Management</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Create an Account</h5>
                                                    <p className="card-text">Create new user accounts to streamline access and collaboration within the organization.</p>
                                                    <a onClick={openUserModal} className="btn btn-outline-primary">Create Account</a>
                                                    <Modal
                                                        isOpen={userModal}
                                                        onRequestClose={closeUserModal}
                                                        style={{
                                                            overlay: {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay color
                                                            },
                                                            content: {
                                                                width: '50%', // Width of the modal
                                                                left: '25%' // Position from the left
                                                            },
                                                        }}
                                                    >
                                                        <div className='d-flex justify-content-between'>
                                                            <span className='h2 mb-4' style={{ fontWeight: "350", verticalAlign: 'middle' }}>Create Account</span>
                                                            <button type="button" className="btn-close" aria-label="Close" onClick={closeUserModal}></button>
                                                        </div>
                                                        <CreateAccount closeWin={closeUserModal} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pb-4" style={{ textAlign: "center" }}>
                                        <h5 className="card-title">Project Management</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Add Project</h5>
                                                    <p className="card-text">Drive progress and innovation!  Create projects and assign resources to steer your team towards achieving greatness.</p>
                                                    <a onClick={openProjectModal} className="btn btn-outline-primary">Add Project</a>
                                                    <Modal
                                                        isOpen={projectModal}
                                                        onRequestClose={closeProjectModal}
                                                        style={{
                                                            overlay: {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay color
                                                            },
                                                            content: {
                                                                width: '50%', // Width of the modal
                                                                left: '25%' // Position from the left
                                                            },
                                                        }}
                                                    >
                                                        <div className='d-flex justify-content-between'>
                                                            <span className='h2 mb-3' style={{ fontWeight: "350", verticalAlign: 'middle' }}>Add Project</span>
                                                            <button type="button" className="btn-close" aria-label="Close" onClick={closeProjectModal}></button>
                                                        </div>
                                                        <CreateProject closeWin={closeProjectModal} />
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}