import { BsFillCalendarCheckFill } from "react-icons/bs";

import { BsFilesAlt } from "react-icons/bs";

import { GrHomeRounded } from "react-icons/gr";

import { BsFillFilePptFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaTicketSimple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsFillHousesFill, BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuMailPlus } from "react-icons/lu";

import { useEffect, useState } from "react";

import axios from "axios";

import { useCookies } from "react-cookie";

export default function SideNav() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [admin, setAdmin] = useState(false);
  const [manager, setManager] = useState(false);

  useEffect(() => {
    axios({
      method: "get",

      url: "http://localhost:4000/user/isManager",

      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then((response) => {
      setManager(response.data.manager);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/user/isAdmin",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then((response) => {
      setAdmin(response.data.isAdmin);
    });
  }, []);

  return (
    <>
      <div className="side-nav">
        <div className="">
          <ul className="px-3">
            <Link className="text-decoration-none text-white" to="/">
              <li className="my-4 text-center">
                <AiFillHome size={24} /> <span className="">Home</span>
              </li>
            </Link>
            {!admin && (
              <Link
                to="/create-timesheet"
                className="text-decoration-none text-white"
              >
                {" "}
                <li className="my-3 text-center">
                  <BsFillCalendarCheckFill size={24} />{" "}
                  <span className="">Create Timesheet</span>{" "}
                </li>
              </Link>
            )}
          

            

            <Link to="/projects" className="text-decoration-none text-white">
              {" "}
              <li className="my-5 text-center">
                <BsFillFilePptFill size={24} /> <span>Projects</span>{" "}
              </li>
            </Link>

            <Link to="/tickets" className="text-decoration-none text-white">
              <li className="my-5 text-center">
                <FaTicketSimple size={24} /> <span>Tickets</span>{" "}
              </li>
            </Link>

            {manager && (
              <div>
                <hr style={{ margin: "11px" }} />
                <Link
                  to="/manager-dashboard"
                  className="text-decoration-none text-white"
                >
                  <li className="my-6 text-center mb-4">
                    <BsFillHousesFill size={24} /> <span>Manager's Desk</span>{" "}
                  </li>
                </Link>
                <Link
                  to="/tickets-received"
                  className="text-decoration-none text-white"
                >
                  <li className="my-6 text-center">
                    <LuMailPlus size={24} /> <span>Tickets Received</span>{" "}
                  </li>
                </Link>
              </div>
            )}
            {admin && (
              <div>
                <hr style={{ margin: "10px" }} />
                <Link
                  to="/admin-dashboard"
                  className="text-decoration-none text-white"
                >
                  <li className="my-6 text-center mb-4">
                    <MdAdminPanelSettings size={29} /> <span>Admin's Desk</span>{" "}
                  </li>
                </Link>
                <Link
                  to="/analytics"
                  className="text-decoration-none text-white"
                >
                  <li className="my-6 text-center">
                    <BsFileEarmarkBarGraphFill size={24} />{" "}
                    <span>Analytics</span>{" "}
                  </li>
                </Link>

                <Link
                  to="/manager-dashboard"
                  className="text-decoration-none text-white"
                >
                  <li className="my-6 text-center">
                    <BsFillHousesFill size={24} /> <span>Manager's Desk</span>{" "}
                  </li>
                </Link>
              </div>
            )}

            {/* <li className="my-3"><BsFillCalendarCheckFill/></li>

                        <li className="my-3"><BsFillCalendarCheckFill/></li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
