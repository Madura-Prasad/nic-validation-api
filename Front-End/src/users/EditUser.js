import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, SetUser] = useState({
        full_name: "",
        mobile: "",
        nationality: "",
        address: "",
        nic: "",
    });

    const { full_name, mobile, nationality, address, nic } = user;

    const onInputChange = (e) => {
        SetUser({ ...user, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        loadUser();
    },[]);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8070/api/v1/updateUser/${id}`, user);
        navigate("/");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8070/api/v1/getUser/${id}`)
        SetUser(result.data)
    }

    return (
        <div className="container">
            <div className="row">
                <div className=" col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
                    <h2 className="text-center m-4 fw-bold">Update User Details</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div class="mb-4 mt-5 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your Name :
                            </label>
                            <input
                                type={"text"}
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here Name"
                                name="full_name"
                                value={full_name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div class="mb-4 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your Mobile Number :
                            </label>
                            <input
                                type={"number"}
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here Mobile Number"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div class="mb-4 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your Nationality :
                            </label>
                            <input
                                type={"text"}
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here Nationality"
                                name="nationality"
                                value={nationality}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div class="mb-4 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your Address :
                            </label>
                            <input
                                type={"text"}
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here Address"
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div class="mb-4 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your NIC :
                            </label>
                            <input
                                type={"text"}
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here NIC"
                                name="nic"
                                value={nic}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-success px-4 fw-bold mx-2"
                        >
                            Update
                        </button>
                        <Link to={"/"} className="btn btn-outline-danger fw-bold">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
