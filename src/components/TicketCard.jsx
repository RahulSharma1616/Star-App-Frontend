export default function TicketCard({name, ticket}) {

    let statusClass = "primary"

    if(ticket.status == "Pending") {
        statusClass="primary"
    } else if(ticket.status == "Rejected") {
        statusClass="danger"
    } else if(ticket.status == "Approved") {
        statusClass="success"
    } else {
        statusClass="secondary"
    }

    return (
        <>
            <div>
                <ul>
                    <li>
                        <div className="shadow-lg col-lg-12 p-3 ">
                            <div className="d-flex">
                                <div className="mx-3 p-3"><h3 className="bg-dark text-white border-rounded p-2">{name.split(" ")[0][0]+name.split(" ")[1][0]}</h3></div>
                                <div className="p-3"> <h3>{ticket.subject} </h3><span class={`badge text-bg-${statusClass}`}>{ticket.status}</span></div>                              
                            </div>
                            <p>{ticket.description}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}