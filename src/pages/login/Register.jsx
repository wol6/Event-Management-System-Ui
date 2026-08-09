
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import img from "../../assets/plainBoard.jpg";
import { toast } from "sonner";

function Register() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [userObj, setUserObj] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        isAdmin: false
    });

    function toggleIsAdmin() {
        setUserObj((prev) => {
            return { ...prev, isAdmin: !prev.isAdmin };
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUserObj((prev) => {
            return { ...prev, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (userObj.password !== userObj.cpassword) {
                toast.warning("Passwords do not match!");
                return;
            }

            const { data: resp } = await api.post("/signup", userObj);

            if (resp.success) {
                toast.success(resp.message);
                setShowAlert(true);
                // setTimeout(() => {
                //     navigate("/login");
                // }, 2000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white">

            <div className="hidden md:block w-[60%] h-screen relative overflow-hidden">
                <img
                    src={img}
                    alt="Event Management"
                    className="absolute inset-0 w-full h-full object-cover"
                />


                <div className="absolute inset-0 bg-black/40"></div>

                {/* Image Content */}
                <div className="absolute inset-0 flex items-end p-10 lg:p-14">
                    <div className="text-white max-w-xl">

                        {/* <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-200 mb-3">
                            Event Management System
                        </p> */}

                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Event Management  System
                            <br />

                        </h2>

                        <p className="mt-4 text-base lg:text-lg text-white/80 max-w-lg">
                            {/* Create events, manage registrations, and connect
                            with your attendees — all in one place. */}
                            Create account to search, join and book events, all in one place.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm">
                                Workshop
                            </span>

                            <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm">
                                Meetings
                            </span>
                            <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm">
                                Meet-up
                            </span>
                            <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm">
                                Conference
                            </span>
                            <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm">
                                Other
                            </span>
                        </div>

                    </div>
                </div>
            </div>


            {/* form*/}
            <div className="w-full md:w-[40%] h-screen flex items-center justify-center px-6 lg:px-10 overflow-y-auto">

                <div className="w-full max-w-md py-6">

                    <div className="text-center mb-5">

                        <h1 className="text-3xl font-bold text-gray-900 mt-2">
                            Create Account
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Create your account to get started
                        </p>

                    </div>


                    {showAlert && (
                        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-center text-sm text-green-600 font-medium">
                            Verify your Email!!!
                        </div>
                    )}


                    <form
                        className="space-y-3.5"
                        onSubmit={handleSubmit}
                    >

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={userObj.name}
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={userObj.email}
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={userObj.password}
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Retype Password
                            </label>

                            <input
                                type="password"
                                name="cpassword"
                                placeholder="Retype your password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                value={userObj.cpassword}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="flex items-center gap-2 pt-1">

                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-blue-600 cursor-pointer"
                                checked={userObj.isAdmin}
                                onChange={toggleIsAdmin}
                            />

                            <label className="text-sm text-gray-600 cursor-pointer">
                                Register as Admin
                            </label>

                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 cursor-pointer transition duration-300 shadow-sm"
                        >
                            Create Account
                        </button>

                    </form>


                    <p className="text-center text-sm text-gray-500 mt-5">

                        Already have an account?{" "}

                        <NavLink
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign In
                        </NavLink>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;
