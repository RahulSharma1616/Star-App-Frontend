import { useState } from "react";

export default function Navbar(){

     const [icon,setIcon]=useState(false);
     function handleClick(){
        setIcon(!icon);
     }

    return(
        <>
        <div className="navbar-container py-2">        
        <div className="container">
            <div className="justify-content-between d-flex">
                <div>
                    <img className="logo" src="https://www.incedoinc.com/wp-content/uploads/incedo-logo.png" alt="logo" />
                </div>
                <div>
                    <h5 onClick={handleClick()} className="text-white bg-dark p-2">VJ</h5>

                    {{icon}?
                    <div>
                        <ul>
                            <li>logout</li>
                            <li>Edit profile</li>
                        </ul>
                    </div>: ""
                    }
                </div>

            </div>
        </div>
        </div>

        </>
    );
}