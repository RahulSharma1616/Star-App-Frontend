import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAccount({ closeWin }) {

    function handleName(e) {

    }

    function handleEmail(e) {

    }

    function handlePassword(e) {

    }

    function handleDesignation(e) {

    }

    function handleSubmit(e) {

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