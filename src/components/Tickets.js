import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Header from "./Header";
import TicketCard from "./TicketCard";

export default function Tickets(){
    return(
<>
<div class="d-flex">
    
        <SideNav/>
    
    <div className="ticketsContainer ">
    <Header/>
     <div className="d-flex p-3">
        <div className="recentTickets">
            {/* <div className="">
            <h5>Recent tickets</h5>
            </div> */}
            <div className="my-3">
                <input type="search" placeholder="Search" />
            </div>
            <div className="w-full my-3">
                <h5>My open tickets</h5>
            </div>
            <div>
                <TicketCard/>
                <TicketCard/>
                <TicketCard/>
                <TicketCard/>

            </div>
        </div>
     </div>
    </div>
</div>
</>
    );
}