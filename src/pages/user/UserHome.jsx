import React, { useEffect, useState } from 'react'
import EventCard from '../../components/user/EventCard'
import api from '../../api/axios'
import Header from '../../components/layout/Header'
import SearchPage from '../../components/layout/SearchPage'
import PagenationBtn from '../../components/layout/PagenationBtn'
import Loader from '@/components/layout/Loader'
import { moveToTop } from '@/utils/style'

function UserHome() {
    const [isLoading, setIsloading] = useState(true)
    const [refresh, setRefresh] = useState(0)
    const [events, setEvents] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [debounceSearch, setDebounceSearch] = useState("")

    useEffect(() => {
        showEvents()
    }, [currentPage, debounceSearch, refresh])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(searchQuery)
        }, 1000)
        return () => clearTimeout(timer)
    }, [searchQuery])

    async function showEvents() {
        setIsloading(true)
        const limit = 6
        try {
            const { data: resp } = await api.get('/show-event', {
                params: {
                    pageNo: currentPage,
                    limit,
                    search: debounceSearch
                }
            })
            if (resp.success) {
                const totalPage = Math.ceil(resp.totalPgCount / limit)
                setTotalPages(totalPage)
                setEvents(resp.list)
                moveToTop()
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsloading(false)

        }
    }

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800 antialiased">

            <Header />

            <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">


                <SearchPage setSearchQuery={setSearchQuery} searchQuery={searchQuery} />


                <div className="mb-5 flex items-end justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-blue-700 sm:text-2xl">
                            Upcoming Events
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Browse available events and register your seat.
                        </p>
                    </div>

                </div>


                <EventCard
                    events={events}
                    setRefresh={setRefresh}
                />


                <PagenationBtn currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalPages={totalPages} />

            </main>
            {isLoading && <Loader />}
        </div>
    )
}

export default UserHome