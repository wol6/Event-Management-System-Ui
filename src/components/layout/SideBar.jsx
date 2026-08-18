import React from 'react'
import { Link } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { BsCalendar2EventFill } from "react-icons/bs";

function SideBar() {
    return (
        <>
            <div className='bg-slate-800 h-full w-56 p-5'>

                <div className='mt-4 flex flex-col text-white font-semibold'>
                    <Link to={"/admin/dashboard"} className='flex items-center gap-3 hover:bg-slate-100 px-1 py-3 rounded-lg hover:text-slate-800 transition-colors duration-500 ease-in-out'>
                        <MdSpaceDashboard className='text-xl' />
                        <span>Dashboard</span> </Link>

                    <Link to={"/admin/events"} className='flex items-center gap-3 hover:bg-slate-100 px-1 py-3 rounded-lg hover:text-slate-800 transition-colors duration-500 ease-in-out'>
                        <BsCalendar2EventFill className='text-lg' />
                        <span>Events</span></Link>

                </div>
            </div>
        </>
    )
}

export default SideBar