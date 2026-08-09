import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import img from '../../assets/plainBoard.jpg'

function Login() {
    const navigate = useNavigate()
    const [loginObj, setLoginObj] = useState({
        email: "",
        password: "",
        isAdmin: false
    })

    function toggleIsAdmin() {
        setLoginObj((prev) => {
            return { ...prev, isAdmin: !prev.isAdmin }
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginObj((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data: resp } = await api.post('/signin', loginObj)
            if (resp.success) {
                sessionStorage.setItem('user', JSON.stringify(resp.user))
                resp.user.isAdmin ? navigate('/admin') : navigate('/user')

            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
        >

            {/*  gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-blue-950/70"></div>

            <div className="relative z-10 w-full max-w-md bg-gray-200 backdrop-blur-sm shadow-2xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Sign in to your account
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={loginObj.email}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={loginObj.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        {/* <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={loginObj.isAdmin}
                            className="accent-blue-600"
                            onChange={toggleIsAdmin}
                        />
                        Is Admin
                    </label> */}

                        {/* <a href="#" className="text-blue-600 hover:underline">
                        Forgot Password?
                    </a> */}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Not yet registered?{" "}
                    <NavLink
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </NavLink>
                </p>

            </div>
        </div>
    );

}

export default Login;