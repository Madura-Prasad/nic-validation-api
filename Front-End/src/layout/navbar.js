import React from "react";
import { Link } from "react-router-dom";

export default function navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand text-white fw-bold" href="">
                        NIC Validation
                    </Link>

                    <Link to={"/add"} className="btn btn-outline-light px-3 fw-bold ">
                        Add User
                    </Link>
                </div>
            </nav>
        </div>
    );
}
