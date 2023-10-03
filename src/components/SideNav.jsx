import {BsFillCalendarCheckFill} from "react-icons/bs";
import {BsFilesAlt} from "react-icons/bs"

export default function SideNav(){
    return(
        <>
         <div className="side-nav">
                <div className="">
                    <ul>
                        <li className="my-5"><BsFillCalendarCheckFill size={28}/></li>
                        <li className="my-5"><BsFilesAlt size={30}/></li>
                        {/* <li className="my-3"><BsFillCalendarCheckFill/></li>
                        <li className="my-3"><BsFillCalendarCheckFill/></li> */}

                    </ul>
                </div>

            </div>
        </>
    )
}