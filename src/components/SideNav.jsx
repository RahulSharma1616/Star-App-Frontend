import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BsFilesAlt } from "react-icons/bs"
import { GrHomeRounded } from "react-icons/gr"
import { AiFillHome } from "react-icons/ai"
import { FaTicketSimple } from "react-icons/fa6"
import { Link } from "react-router-dom";
import { BsFillFilePptFill, BsFillHousesFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function SideNav() {

    const [cookies, setCookie] = useCookies(['token']);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:4000/user/isManager",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setManager(response.data.manager);
        })
    }, [])


    return (
        <>
            <div className="side-nav">
                <div className="">
                    <ul className="px-3">
                        <Link className="text-decoration-none text-white" to="/">
                            <li className="my-5 text-center"><AiFillHome size={24} /> <span className="">Home</span></li></Link>
                        <Link to="/create-timesheet" className="text-decoration-none text-white">  <li className="my-5 text-center"><BsFillCalendarCheckFill size={24} /> <span className="">Create Timesheet</span> </li></Link>
                        <Link to="/projects" className="text-decoration-none text-white"> <li className="my-5 text-center"><BsFillFilePptFill size={24} /> <span>Projects</span> </li></Link>
                        <Link to="/tickets" className="text-decoration-none text-white">
                            <li className="my-5 text-center"><FaTicketSimple size={24} /> <span>Tickets</span> </li>
                        </Link>

                        {
                            manager && (
                                <div>
                                    <hr style={{ margin: "10px" }} />
                                    <Link to="/manager-dashboard" className="text-decoration-none text-white"><li className="my-6 text-center"><BsFillHousesFill size={24}/> <span>Manager's Desk</span> </li></Link>
                                </div>
                            )
                        }


                        {/* <li className="my-3"><BsFillCalendarCheckFill/></li>
                        <li className="my-3"><BsFillCalendarCheckFill/></li> */}
                    </ul>
                </div>

            </div>
        </>
    )
}