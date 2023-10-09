import { useState } from "react";
import profileIcon from "../images/projectManager.png"

export default function Navbar(){

   

    return(
        <>
        <div className="navbar-container py-2">        
        <div className="container">
            <div className="justify-content-between d-flex">
                <div>
                    <img className="logo" src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png" alt="logo" />
                </div>
                <div>
                <div class="dropdown">

<img

  src={profileIcon}

  class="dropdown-toggle rounded-circle"

  type="button"

  data-bs-toggle="dropdown"

  aria-expanded="false"

  style={{ width: "30px", height: "30px" }}

></img>



<ul

  class="dropdown-menu shadow"

  style={{

    width: "270px",

    textAlign: "center",

    paddingBottom: "20px",

    border: "none",

    marginRight: "-40px !important",

  }}

>

  <li>

    <a class="dropdown-item" href="#">

      <img

        src={profileIcon}

        alt="profile-icon"

        style={{

          width: "40px",

          height: "40px",

          marginRight: "20px",

          marginLeft: "-50px",

          marginTop: "15px",

        }}

      ></img>

      My Profile

      <br />

      <p

        className="small"

        style={{ marginLeft: "8px", marginTop: "-20px" }}

      >

        <sub> Update Profile</sub>

      </p>

    </a>

  </li>

  <br />

  <li>

    <button

      className="btn btn-primary btn-sm"

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

                    
                </div>

            </div>
        </div>
        </div>

        </>
    );
}