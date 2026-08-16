import React, { useEffect, useState } from 'react'
import EventCard from '../components/user/EventCard'
import api from '../api/axios'
import SearchPage from '../components/layout/SearchPage'
import PagenationBtn from '../components/layout/PagenationBtn'
import Loader from '@/components/layout/Loader'
import { moveToTop } from '@/utils/style'

function ExploreEvents() {
    const [isLoading, setIsloading] = useState(false)
    const [events, setEvents] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [debounceSearch, setDebounceSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    async function getEvents() {
        setIsloading(true)
        const limit = 9
        try {
            const { data: resp } = await api.get('/explore-events', {
                params: {
                    pageNo: currentPage,
                    limit,
                    search: debounceSearch,
                }
            })
            if (resp.success) {
                const list = resp.list ?? []
                setEvents(list)
                const totalPage = Math.ceil(resp.totalPgCount / limit)
                setTotalPages(totalPage)
                moveToTop()
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        getEvents()
    }, [currentPage, debounceSearch])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(searchQuery)
        }, 1000)
        return () => clearTimeout(timer)
    }, [searchQuery])

    return (
        <>
            {/* Your form */}
            <div className='p-6'>
                <SearchPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <EventCard events={events} isExplorePage={true} />
                <PagenationBtn currentPage={currentPage} setCurrentPage={setCurrentPage}
                    totalPages={totalPages} />
            </div>


            {isLoading && <Loader />}

        </>

    )
}

export default ExploreEvents