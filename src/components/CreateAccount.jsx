import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAccount({ closeWin }) {

    let [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    function handleName(e) {
        user.name = e.target.value;
    }

    function handleEmail(e) {
        user.email = e.target.value;
    }

    function handlePassword(e) {
        user.password = e.target.value;
    }

    function handleDesignation(e) {
        user.designation = e.target.value;
    }

    function handleSubmit(e) {
        setIsLoading(true);
        axios({
            method: "post",
            url: "http://localhost:4000/user/signup",
            data: user
        }).then((response) => {
            console.log(response);
            setIsLoading(false)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Name
                    </label>
                    <input
                        className="form-control"
                        onChange={handleName}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleEmail}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handlePassword}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="designation" className="form-label">
                        Designation
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="designation"
                        name="designation"
                        onChange={handleDesignation}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    Sign Up
                </button>
            </form>
        </div>
    )
}