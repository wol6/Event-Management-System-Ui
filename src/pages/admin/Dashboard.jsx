import React, { useState } from 'react';
import { FaBookOpen } from 'react-icons/fa6'
import { LuNotepadTextDashed } from "react-icons/lu";
import { FaUser,FaUserFriends  } from "react-icons/fa";
import { SiBitcoincash } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import { MdEventSeat } from "react-icons/md";
import AdminHome from './AdminHome';
import Chart from '@/components/admin/Chart';

function Dashboard() {

    return (
        <AdminHome>
            <div className='w-full'>
                <div className='p-0'>
                    <span className='flex items-center gap-3 mb-3'>
                        <span className='text-3xl font-bold'>Welcome, {"userName"}!</span>
                    </span>
                    {/* <span className='text-gray-400'>Track your reading journey here.</span> */}
                </div>

                <div className='w-full flex justify-around'>
                    <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                        <LuNotepadTextDashed className='text-blue-900 text-4xl bg-gray-200 p-1 rounded-xl' />
                        <span>
                            <span className='block text-md font-semibold'>Total Events</span>
                            <span className='text-xl font-bold'>12</span>
                        </span>
                    </div>
                    <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                        <FaUser className='text-gray-700 text-4xl bg-gray-200 p-1 rounded-xl' />
                        <span>
                            <span className='block text-md font-semibold'>Total Users</span>
                            <span className='text-xl font-bold'>12</span>
                        </span>
                    </div>
                    <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                        <FaUserFriends  className='text-orange-500 text-4xl bg-gray-200 p-1 rounded-xl' />
                        <span>
                            <span className='block text-md font-semibold'>Total Attendees</span>
                            <span className='text-xl font-bold'>12</span>
                        </span>
                    </div>
                    <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                        <SiBitcoincash className='text-green-700 text-4xl bg-gray-200 p-1 rounded-xl' />
                        <span>
                            <span className='block text-md font-semibold'>Total Revenue</span>
                            <span className='text-xl font-bold'>12</span>
                        </span>
                    </div>
                </div>

                <hr className='text-gray-200 mt-4' />
            </div>

            <div className='px-13 mt-4  flex justify-around'>
                <div className='flex items-center gap-3 px-2 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <MdEventSeat className='text-purple-700 text-4xl bg-purple-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-xs font-semibold'>Paid Seated Events</span>
                        <span className='text-lg font-bold'>12</span>
                    </span>
                </div>
                <div className='flex items-center gap-3 px-2 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <MdEventSeat className='text-green-600 text-4xl bg-green-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-xs font-semibold'>Free Seated Events</span>
                        <span className='text-lg font-bold'>12</span>
                    </span>
                </div>
                <div className='flex items-center gap-3 px-2 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <IoIosPeople  className='text-purple-700 text-4xl bg-purple-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-xs font-semibold'>Paid Open Events</span>
                        <span className='text-lg font-bold'>12</span>
                    </span>
                </div>
                <div className='flex items-center gap-3 px-2 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <IoIosPeople  className='text-green-600 text-4xl bg-green-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-xs font-semibold'>Free Open Events</span>
                        <span className='text-lg font-bold'>12</span>
                    </span>
                </div>
            </div>
            <Chart />
        </AdminHome>
    );
}

export default Dashboard;
