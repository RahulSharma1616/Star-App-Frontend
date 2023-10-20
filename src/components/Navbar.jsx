import { useEffect, useState } from "react";
import logo from "../images/LOGO.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [image, setImage] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      axios({
        method: "get",
        url: "http://localhost:4000/user/profile",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }).then((response) => {
        setImage(response.data.image);
      });
    }
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function handleLogout() {
    removeCookie("token");
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay color
          },
          content: {
            width: "40%", // Width of the modal
            height: "83%",
            left: "30%", // Position from the left
            top: "12%",
          },
        }}
      >
        <div className="d-flex justify-content-between">
          <span
            className="h2 mb-2"
            style={{ fontWeight: "350", verticalAlign: "middle" }}
          >
            My Profile
          </span>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeModal}
          ></button>
        </div>
        <Profile closeWin={closeModal} />
      </Modal>
      <div className="navbar-container justify-content-between py-2">
        <div className="mx-5">
          <div className="justify-content-between d-flex">
            <Link to="/">
              <div>
                {/* <img className="logo" src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png" alt="logo" /> */}
                <img className="logo p-0" src={logo} />
              </div>
            </Link>
            {cookies.token && (
              <div>
                <div className="dropdown">
                  <img
                    src={image.url}
                    className="dropdown-toggle rounded-circle navbarIcon"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <GiHamburgerMenu
                    // src={image.url}
                    className="dropdown-toggle rounded-circle hamburger"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <ul
                    className="dropdown-menu shadow"
                    style={{
                      width: "270px",
                      textAlign: "center",
                      paddingBottom: "20px",
                      border: "none",
                      marginRight: "-40px !important",
                    }}
                  >
                    <li>
                      <a onClick={openModal} className="dropdown-item" href="#">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    
                    <li>
                      <Link className="text-decoration-none" to="/">
                        <a className="dropdown-item smallDropdown text-dark" >Home</a>

                      </Link>
                    </li>
                    <li>
                      <Link to="/tickets">

                        <a className="dropdown-item smallDropdown text-dark" href="">Tickets</a>

                      </Link>
                    </li>
                    <li>
                      <Link to="/projects">
                        <a className="dropdown-item smallDropdown text-dark" href="">Projects</a>

                      </Link>
                    </li>
                    <li>
                      <Link to="/create-timesheet">
                        <a className="dropdown-item smallDropdown text-dark" href="">Timesheet</a>

                      </Link>
                    </li>
                    <li>
                      <Link to="/manager-dashboard">
                        <a className="dropdown-item smallDropdown text-dark" href="">Manager's desk</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/tickets-received">
                        <a className="dropdown-item smallDropdown text-dark" href="">Tickets Received</a>

                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={handleLogout}
                          style={{
                            width: "200px",
                            marginLeft: "10px",
                            marginRight: "10px",
                            marginBottom: "-10px",
                          }}
                        >
                          Logout
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
