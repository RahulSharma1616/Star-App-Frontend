import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SideNav from "./SideNav";
import Navbar from "./Navbar";
import Toast from "react-bootstrap/Toast";
import { MdInfoOutline } from "react-icons/md";
import { Line } from "react-chartjs-2";
import TimesheetsFilled from "./graphs/TimesheetsFilled";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

export default function Analytics({ closeWin }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["token"]);

  let [message, setMessage] = useState(""); // State variable for managing a message

  // This state variable manages the visibility of the toast.
  const [showToast, setShowToast] = useState(false);

  // This function is responsible for toggling the state of the showToast variable.
  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(() => {
    setIsLoading(false);
    axios({
      method: "get",
      url: "http://localhost:4000/project/all",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then(
      function (response) { },
      function (error) {
        console.log("error: ", error);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      {isLoading && (
        <div className="loader-overlay">
          <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-1 mt-6">
          <SideNav />
        </div>
        <div className="col-lg-11 mt-6">
          <div className="table-container">
            <div className="timesheet-header d-flex justify-content-between">
              <h3
                className="h2 m-2"
                style={{ fontWeight: "350", verticalAlign: "middle" }}
              >
                Analytics
              </h3>
            </div>
            <div className="card m-3">
              <div className="card-body">
                <div className="pb-4" style={{ textAlign: "center" }}>
                  <h5 className="card-title">Overall Insights</h5>
                </div>
                <div className="row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title"></h5>
                        <div>
                          <Line data={data} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title"></h5>
                        <div>
                          <TimesheetsFilled />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* */}
          </div>
        </div>

        <Toast
          show={showToast}
          delay={5000} autohide
          onClose={toggleShowToast}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Toast.Body className="bg-success text-white">
            <strong>
              <MdInfoOutline size={25} /> {message}
            </strong>
            <button
              type="button"
              className="btn-close btn-close-white float-end"
              onClick={toggleShowToast}
            ></button>
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}
