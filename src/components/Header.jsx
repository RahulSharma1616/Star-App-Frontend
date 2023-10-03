import { Link } from "react-router-dom";

export default function Header(){
    return(
<>
<div className="header d-flex w-full justify-content-between">
                    <h3>Tickets</h3>
                    <Link to="/create-timesheet">
                    <button>Raise a ticket</button>
                    </Link>
                </div>
</>
    );
}