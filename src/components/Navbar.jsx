import { useEffect, useState } from "react";
import profileIcon from "../images/projectManager.png"
import logo from "../images/LOGO.png"
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Navbar() {

  const [image, setImage] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      axios({
        method: "get",
        url: "http://localhost:4000/user/profile",
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
        }
      }).then((response) => {
        setImage(response.data.image)
      })
    }
  }, [])


  function handleLogout() {
    removeCookie('token');
  }

  return (
    <>
      <div className="navbar-container py-2">
        <div className="container">
          <div className="justify-content-between d-flex">
            <div>
              {/* <img className="logo" src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png" alt="logo" /> */}
              <img className="logo p-0" src={logo} />
            </div>
            {cookies.token && <div>
              <div className="dropdown">
                <img
                  src={image.url}
                  className="dropdown-toggle rounded-circle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "30px", height: "30px" }}
                ></img>
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
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <button
                      className="btn btn-primary btn-sm"
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
                  </li>
                </ul>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}