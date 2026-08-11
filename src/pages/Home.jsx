
import React from "react";
import { NavLink } from "react-router-dom";
import bgImg from "../assets/homeBg.jpg";

function Home() {
    return (
        <div
            className="min-h-screen w-full relative bg-cover bg-center flex flex-col"
            style={{ backgroundImage: `url(${bgImg})` }}
        >

            {/* gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

            {/* nav */}
            <nav className="relative z-10 w-full px-6 lg:px-12 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <NavLink
                        to="/"
                        className="text-xl lg:text-2xl font-bold text-white"
                    >
                        Event<span className="text-blue-400">Hub</span>
                    </NavLink>

                    <div className="flex items-center gap-3 sm:gap-4">

                        <NavLink
                            to="/login"
                            className="px-4 py-2 text-sm sm:text-base text-white hover:text-blue-300 transition"
                        >
                            Sign In
                        </NavLink>

                        <NavLink
                            to="/register"
                            className="px-4 sm:px-5 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
                        >
                            Register
                        </NavLink>

                    </div>
                </div>
            </nav>


            <main className="relative z-10 flex-1 flex items-center justify-center px-6 text-center">

                <div className="max-w-4xl text-white">

                    <p className="text-blue-300 uppercase tracking-[0.25em] text-sm font-semibold mb-5">
                        Event Management System
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                        Create Moments.
                        <br />
                        <span className="text-blue-400">
                            Manage Events.
                        </span>
                    </h1>

                    <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
                        Create, manage and discover amazing events.
                        Bring people together and make every event memorable.
                    </p>


                    <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">

                        <NavLink
                            to="/explore"
                            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-xl"
                        >
                            Explore
                        </NavLink>

                        <NavLink
                            to="/login"
                            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition"
                        >
                            Sign In
                        </NavLink>

                    </div>

                </div>

            </main>


            {/* footer */}
            <footer className="relative z-10 px-6 py-5 text-center text-white/60 text-sm">

                <div className="max-w-7xl mx-auto border-t border-white/20 pt-5">

                    <p>
                        © {new Date().getFullYear()} EventHub. All rights reserved v.2.0.1
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;
