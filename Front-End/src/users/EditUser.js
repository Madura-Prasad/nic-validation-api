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

    const [error, setError] = useState({
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
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            await axios.put(`http://localhost:8070/api/v1/updateUser/${id}`, user);
            navigate("/");
        }
    };

    const validateFields = () => {
        let isValid = true;
        let full_nameError = "";
        let mobileError = "";
        let nationalityError = "";
        let addressError = "";
        let nicError = "";

        // Mobile number validation
        const mobileRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
        if (!mobileRegex.test(mobile)) {
            isValid = false;
            mobileError = "Please Enter a Valid Mobile Number";
        }

        // NIC validation
        const nicRegex = /^([0-9]{9}[v|V]|[0-9]{12})$/;
        if (!nicRegex.test(nic)) {
            isValid = false;
            nicError = "Please Enter a Valid NIC Number";
        }

        // Name validation
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!nameRegex.test(full_name)) {
            isValid = false;
            full_nameError = "Please Enter a Valid Name";
        }

        //Nationality validation
        if (nationality.length === 0) {
            isValid = false;
            nationalityError = "Please Enter Nationality";
        }

        //Address validation
        if (address.length === 0) {
            isValid = false;
            addressError = "Please Enter Address";
        }

        setError({
            mobile: mobileError,
            nic: nicError,
            full_name: full_nameError,
            nationality: nationalityError,
            address: addressError,
        });
        return isValid;
    };

    const loadUser = async () => {
        const result = await axios.get(
            `http://localhost:8070/api/v1/getUser/${id}`
        );
        SetUser(result.data);
    };

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
                            {error.full_name && (
                                <div className="text-danger fw-semibold ">
                                    {error.full_name}
                                </div>
                            )}
                        </div>

                        <div class="mb-4 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your Mobile Number :
                            </label>
                            <input
                                type={"text"}
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here Mobile Number"
                                name="mobile"
                                value={mobile}
                                onChange={(e) => onInputChange(e)}
                            />
                            {error.mobile && (
                                <div className="text-danger fw-semibold ">{error.mobile}</div>
                            )}
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
                            {error.nationality && (
                                <div className="text-danger fw-semibold ">
                                    {error.nationality}
                                </div>
                            )}
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
                            {error.address && (
                                <div className="text-danger fw-semibold ">{error.address}</div>
                            )}
                        </div>

                        <div class="mb-4 text-start">
                            <label for="exampleFormControlInput1" class="form-label fw-bold">
                                Enter Your NIC :
                            </label>
                            <input
                                type={"text"} disabled
                                class="form-control fw-bold"
                                id="exampleFormControlInput1"
                                placeholder="Enter Here NIC"
                                name="nic"
                                value={nic}
                                onChange={(e) => onInputChange(e)}
                            />
                            {error.nic && (
                                <div className="text-danger fw-semibold ">{error.nic}</div>
                            )}
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
