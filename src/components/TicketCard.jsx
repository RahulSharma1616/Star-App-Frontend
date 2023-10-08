export default function TicketCard({name, ticket}) {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <div className="shadow-lg p-3 ticketcard">
                            <div className="d-flex">
                                <div className="mx-3 p-3"><h3 className="bg-dark text-white border-rounded p-2">{name.split(" ")[0][0]+name.split(" ")[1][0]}</h3></div>
                                <div className="p-3"> <h3>{ticket.subject}</h3></div>
                            </div>
                            <p>{ticket.description}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}