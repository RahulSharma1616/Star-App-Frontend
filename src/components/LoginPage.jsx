import banner from "../images/STAR (1).gif";
import loginicon from "../images/OIP 1.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "./Navbar";

export default function LoginPage() {
  var [isLoading, setLoading] = useState(false);
  var [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigation = useNavigate();
  var user = {};

  function email(e) {
    user.email = e.target.value;
  }

  function password(e) {
    user.password = e.target.value;
  }

  function login() {
    setLoading(true);

    axios({
      method: "post",
      url: "http://localhost:4000/user/login",
      data: user,
    }).then(
      function (response) {
        setLoading(false);

        if (response.data.token) {

          const expirationTime = new Date();
          expirationTime.setHours(expirationTime.getHours() + 24);

          setCookie("token", response.data.token, { path: "/", expires: expirationTime });
          navigation("/")
          setError("");
        } else {
          setError("Invalid Credentials");
        }
      },
      function (error) {
        setLoading(false);
        setError(error.response.data.message)
        console.log("error: ", error);
      }
    );
  }

  return (
    <>
    <Navbar/>
      <div className="">
        <div className="row">
          <div className="col-lg-6">
            <img mx-2 className="loginbanner" src={banner} alt="" />
          </div>
          <div className="col-lg-6">
            <div className="login-container">
              <div className="  loginform text-center">
                <div className=" my-3">
                  <h4 className="heading">Welcome to Star App</h4>
                </div>
                <div className="my-2">
                  <p className="subheading">Your ultimate shift companion</p>
                </div>
                <div className="d-flex justify-content-center text-center">
                  {error != "" && <div className="w-75 alert alert-danger" role="alert">
                    {error}
                  </div>}
                </div>
                {/* <div className="loginformicon my-3">
                            <img src={loginicon} alt="" />
                        </div> */}
                <div className="my-3">
                  <input
                    className="login-input"
                    type="email"
                    onChange={email}
                    placeholder="Email"
                  />
                </div>
                <div className="my-3 ">
                  <input
                    className="login-input"
                    type="password"
                    onChange={password}
                    placeholder="Password"
                  />
                </div>
                <div className="text-left my-3">
                  <p className="forgot">Forgot password?</p>
                </div>
                <div className="my-3">
                  {isLoading == false && (
                    <button type="button" onClick={login} className="button-primary">
                      Login
                    </button>
                  )}
                  {isLoading && (
                    <button type="button" disabled onClick={login} className="button-primary">
                      Please Wait
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
