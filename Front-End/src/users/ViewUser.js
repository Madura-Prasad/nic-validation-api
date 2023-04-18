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
        const result = await axios.get(`http://localhost:8070/api/v1/getUser/${id}`)
        setUser(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className=" col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
                    <h2 className="text-center m-4 fw-bold">View User Details</h2>
                    <div className='card'>
                        <div className='card-header '>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item text-start'>
                                    <b className='fw-semibold'>Name :- </b>
                                    <b>{user.full_name}</b>
                                </li>
                                <li className='list-group-item text-start'>
                                    <b className='fw-semibold'>Mobile number :- </b>
                                    <b>{user.mobile}</b>
                                </li>
                                <li className='list-group-item text-start'>
                                    <b className='fw-semibold'>Nationality :- </b>
                                    <b>{user.nationality}</b>
                                </li>
                                <li className='list-group-item text-start'>
                                    <b className='fw-semibold'>Address :- </b>
                                    <b>{user.address}</b>
                                </li>
                                <li className='list-group-item text-start'>
                                    <b className='fw-semibold'>NIC :- </b>
                                    <b>{user.nic}</b>
                                </li>
                                <li className='list-group-item'>
                                    <button className='mx-5 btn btn-outline-danger fw-bold'>Validate NIC</button>
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
