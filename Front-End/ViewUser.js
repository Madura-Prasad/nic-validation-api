import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {


    const [user, setUser] = useState({
        full_name: "",
        mobile: "",
        nationality: "",
        address: "",
        nic: "",
    })

    const { id } = useParams();

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/getUser/${id}`)
        setUser(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className=" col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
                    <h2 className="text-center m-4 fw-bold">View User Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            <b>User ID : </b>
                            {user.id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name : </b>
                                    {user.full_name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Mobile number : </b>
                                    {user.mobile}
                                </li>
                                <li className='list-group-item'>
                                    <b>Nationality : </b>
                                    {user.nationality}
                                </li>
                                <li className='list-group-item'>
                                    <b>Address : </b>
                                    {user.address}
                                </li>
                                <li className='list-group-item'>
                                    <b>NIC : </b>
                                    {user.nic}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link to={"/"} className="btn btn-outline-warning px-3 fw-bold mt-5">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
