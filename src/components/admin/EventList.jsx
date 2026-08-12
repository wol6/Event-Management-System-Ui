import React, { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import api from '../../api/axios'
import EventDialog from './EventDialog'
import ViewAttendee from './ViewAttendee'

function EventList({ refreshList }) {
    const [open, setOpen] = useState(false)
    const [attOpen, setAttOpen] = useState(false)
    const [events, setEvents] = useState([])
    const [editEventObj, setEditEventObj] = useState({})
    const [attendeeList, setAttendeeList] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})

    // Virtualization
    const parentRef = useRef(null)

    const rowVirtualizer = useVirtualizer({
        count: events.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
        overscan: 5,
    })

    useEffect(() => {
        showEvents()
    }, [refreshList, open])

    async function showEvents() {
        try {
            const { data: resp } = await api.get('/show-event', {
                params: {
                    pageNo: 0,
                    limit: 0,
                }
            })

            if (resp.success) {
                setEvents(resp.list)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleView(event) {
        setAttOpen(true)
        setSelectedEvent(event)

        try {
            const { data: resp } = await api.get('/get-attendee', {
                params: { id: event._id }
            })

            if (resp.success) {
                const attendeesList = resp?.attendeeList || []
                setAttendeeList(attendeesList)
            }

        } catch (e) {
            console.log(e)
        }
    }

    async function handleEdit(event) {
        setOpen(true)
        setEditEventObj(event)
    }

    async function handleDelete(event) {
        const userConfirmed = window.confirm("Are You Sure")

        if (!userConfirmed) return

        try {
            const { data: resp } = await api.delete(
                `/delete-event/${event._id}`
            )

            if (resp.success) {
                showEvents()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>

            {/*  header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1.5fr] border-b bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-600">

                <div className="px-6 py-4">
                    Event Name
                </div>

                <div className="px-6 py-4">
                    Date
                </div>

                <div className="px-6 py-4">
                    Time
                </div>

                <div className="px-6 py-4">
                    Location
                </div>

                <div className="px-6 py-4">
                    Category
                </div>

                <div className="px-6 py-4">
                    Capacity
                </div>

                <div className="px-6 py-4 text-right">
                    Actions
                </div>

            </div>


            {/* List */}
            <div
                ref={parentRef}
                className="h-[400px] overflow-auto"
            >

                {/*  virtual height */}
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: 'relative',
                    }}
                >

                    {/* Only visible rows are rendered */}
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {

                        const event = events[virtualRow.index]

                        return (
                            <div
                                key={event._id}
                                className="absolute left-0 top-0 grid w-full grid-cols-[2fr_1fr_1fr_1.5fr_1fr_1fr_1.5fr] border-b bg-white font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50/70"
                                style={{
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >

                                {/* Event Name */}
                                <div className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                                    {event.title}
                                </div>


                                {/* Date */}
                                <div className="whitespace-nowrap px-6 py-4 text-gray-500">
                                    {event.date}
                                </div>


                                {/* Time */}
                                <div className="whitespace-nowrap px-6 py-4 text-gray-500">
                                    {event.time}
                                </div>


                                {/* Location */}
                                <div className="whitespace-nowrap px-6 py-4 text-gray-500">
                                    {event.location}
                                </div>


                                {/* Category */}
                                <div className="whitespace-nowrap px-6 py-4 text-gray-500">
                                    {event.category}
                                </div>


                                {/* Capacity */}
                                <div className="whitespace-nowrap px-6 py-4 text-gray-500">
                                    {event.capacity}
                                </div>


                                {/* Actions */}
                                <div className="whitespace-nowrap px-6 py-4 text-right text-sm">

                                    <div className="flex justify-end gap-3">

                                        {/* View */}
                                        <button
                                            onClick={() => handleView(event)}
                                            className="cursor-pointer text-blue-600 transition-colors hover:text-blue-900"
                                        >
                                            View
                                        </button>


                                        {/* Edit */}
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="cursor-pointer text-amber-600 transition-colors hover:text-amber-900"
                                        >
                                            Edit
                                        </button>


                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(event)}
                                            className="cursor-pointer text-red-600 transition-colors hover:text-red-900"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>
                        )
                    })}

                </div>

            </div>


            {/* Edit Event Dialog */}
            <EventDialog
                open={open}
                setOpen={setOpen}
                editEventObj={editEventObj}
            />


            {/* View Attendee Dialog */}
            <ViewAttendee
                attOpen={attOpen}
                setAttOpen={setAttOpen}
                selectedEvent={selectedEvent}
                attendeeList={attendeeList}
            />

        </div>
    )
}

export default EventList