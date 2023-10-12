import {BsFillCalendarCheckFill} from "react-icons/bs";
import {BsFilesAlt} from "react-icons/bs"
import {GrHomeRounded} from "react-icons/gr"
import {AiFillHome} from "react-icons/ai"
import {FaTicketSimple} from "react-icons/fa6"
import { Link } from "react-router-dom";
import {SiFiles} from "react-icons/si"

export default function SideNav(){

//    function handleClick(id){
//      document.getElementById.className.add("rr")
//    }


    return(
        <>
         <div className="side-nav">
                <div className="">
                    <ul className="px-3">
                        <Link className="text-decoration-none text-white" to= "/">
                        <li  id="home" className="my-5 text-center react-icon"><AiFillHome size={28}/> <span className="">Home</span></li></Link>
                        <Link to="/create-timesheet" className="text-decoration-none text-white">  <li className="my-5 text-center"><BsFillCalendarCheckFill size={28}/> <span className="">Create Timesheet</span> </li></Link>
                        <Link to="/projects" className="text-decoration-none text-white"> <li className="my-5 text-center"><SiFiles size={30}/> <span>Projects</span> </li></Link>
                        <Link to="/tickets" className="text-decoration-none text-white">
                        <li className="my-5 text-center"><FaTicketSimple size={30}/> <span>Tickets</span> </li>
                        </Link>

                        {/* <li className="my-3"><BsFillCalendarCheckFill/></li>
                        <li className="my-3"><BsFillCalendarCheckFill/></li> */}

                    </ul>
                </div>

            </div>
        </>
    )
}