import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);


    const {id} = useParams();

    useEffect(() => {
        loadUsers();
    });

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/getUsers");
        setUsers(result.data);
    };


    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/deleteUser/${id}`)
        loadUsers()
    }

    return (
        <div className="container">
            <div className="py-5 table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark text-light shadow ">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Nationality</th>
                            <th scope="col">Address</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th className="fw-bold" scope="row" key={index}>{index + 1}</th>
                                <td className="fw-bold">{user.full_name}</td>
                                <td className="fw-bold">{user.mobile}</td>
                                <td className="fw-bold">{user.nationality}</td>
                                <td className="fw-bold">{user.address}</td>
                                <td className="fw-bold">{user.nic}</td>
                                <td>
                                    <Link to={`/viewUser/${user.id}`} className="btn btn-outline-secondary px-3 fw-bold">View</Link>
                                    <Link to={`/editUser/${user.id}`} className="btn btn-outline-warning px-3 fw-bold mx-2">Edit</Link>
                                    <button className="btn btn-outline-danger px-3 fw-bold mx-2"
                                    onClick={()=>deleteUser(user.id)}
                                    >Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
