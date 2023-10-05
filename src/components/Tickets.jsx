import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Header from "./Header";
import TicketCard from "./TicketCard";

export default function Tickets() {

    return (
        <>
            <div className="d-flex">
                <SideNav />
                <div className="ticketsContainer ">
                    <Header />
                    <div className="d-flex p-3">
                        <div className="recentTickets">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="my-3 col-md-6">
                                        <input type="search" className="form-control border border-dark" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TicketCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}