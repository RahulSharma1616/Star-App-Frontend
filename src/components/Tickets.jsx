import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import Header from "./Header";
import TicketCard from "./TicketCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "./Navbar";

export default function Tickets() {

    const [cookies, setCookie] = useCookies(['token']);
    const [ticketsData, setTicketsData] = useState([]);
    const [name, setName] = useState("")

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:4000/ticket/raised",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then((response) => {
            setTicketsData(response.data.tickets);
            setName(response.data.name);
        }, [])
    })

    return (
        <>
        <Navbar/>
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
                                {
                                    ticketsData.map((ticket) => {
                                        return (
                                            <TicketCard key={ticket._id} name={name} ticket={ticket} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}