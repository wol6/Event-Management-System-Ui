import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import MyEvents from '../user/MyEvents'
import Loader from './Loader'

function Header() {

    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(false)
    const [userName, setUserName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [openMyEvent, setOpenMyEvent] = useState(false)

    useEffect(() => {
        const user = sessionStorage.getItem("user")
        if (user) {
            const userObj = JSON.parse(user)
            const name = userObj.isAdmin ? `${userObj.name} (ADMIN)` : `${userObj.name}`
            const isAdmin = userObj.isAdmin ? true : false
            setIsAdmin(isAdmin)
            setUserName(name)
        }
    })

    function openDialog() {
        setOpenMyEvent(true)
    }

    async function handleLogout() {
        setIsloading(true)
        try {
            const { data: resp } = await api.post('/logout')
            if (resp.success) {
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }finally{
        setIsloading(false)
        }
    }

    return (
        <div>
            <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">

                    <h1 className="truncate text-lg font-bold tracking-tight text-blue-900 sm:text-xl">
                        {isAdmin
                            ? "Event Management (Admin)"
                            : "Event Management"}
                    </h1>


                    <div className="flex items-center gap-3 sm:gap-5">

                        {!isAdmin && (
                            <span
                                onClick={openDialog}
                                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 sm:block"
                            >
                                My Events
                            </span>
                        )}


                        <span className="hidden sm:block max-w-[150px] truncate rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm sm:max-w-none sm:px-4 sm:text-sm">
                            {userName}
                        </span>


                        <button
                            onClick={handleLogout}
                            className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:px-4"
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </header>

            <MyEvents
                openMyEvent={openMyEvent}
                setOpenMyEvent={setOpenMyEvent}
            />
           {isLoading && <Loader />}
        </div>
    )
}

export default Header