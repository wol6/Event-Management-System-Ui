import React, { useState } from "react";
import api from "../../api/axios";
import Reservation from "./Reservation";
import img from '../../assets/homeBg.jpg'
import { toast } from "sonner";
import InputDialogBox from "../layout/InputDialogBox";

function EventCard({ events, setRefresh, isExplorePage = false }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [eventObj, setEventObj] = useState({})
    const [openInputDialog, setOpenInputDialog] = useState(false)
    const [regDetails, setRegDetails] = useState({ eventId: '', count: '1' })


    function handleRegistration(event) {
        if (event.eventType == "open") {
            if (isExplorePage) {
                return toast.info('Sign-in to register for events')
            }
            setRegDetails({ ...regDetails, eventId: event._id })
            setOpenInputDialog(true)
            // handleRegister(event._id)
        } else {
            if (isExplorePage) {
                return toast.info('Sign-in to register for events')
            }
            openDialogBox(event)
        }
    }
    async function handleRegister() {

        try {
            const { data: resp } = await api.post('/reserve-seat', {
                id: regDetails.eventId,
                count: regDetails.count
            })
            if (resp.success) {
                setRefresh(prev => prev + 1)
            }
        } catch (e) {
            console.log(e)
        }
    }
    function openDialogBox(event) {
        setOpenDialog(true)
        setEventObj(event)
    }

    return (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            {events.length === 0 && (
                <div className="col-span-full flex min-h-[250px] items-center justify-center">
                    <div className="text-center">
                        <div className="mb-2 text-4xl">📅</div>
                        <h3 className="text-base font-semibold text-gray-800">
                            No Events Found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            There are currently no events available.
                        </p>
                    </div>
                </div>
            )}

            {events.map((event) => (
                <div
                    key={event._id}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                    <div className="relative h-32 overflow-hidden bg-gray-200">

                        {<img
                            src={event.imageUrl || img}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />}

                        <div className={`absolute inset-0 bg-gradient-to-t from-black/${event.image ? '70' : '70'} via-black/${event.image ? '10' : '10'} to-transparent`}></div>


                        <div className="absolute top-3 left-3">
                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
                                {event.category}
                            </span>
                        </div>


                        <div className="absolute bottom-3 right-3">
                            <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                                👥 {event.booked}/{event.capacity} seats
                            </span>
                        </div>

                    </div>


                    <div className="p-4">

                        <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
                            {event.title}
                        </h3>


                        <p className="mt-1.5 line-clamp-2 min-h-[36px] text-xs leading-4 text-gray-500">
                            {event.description}
                        </p>


                        <div className="mt-3 grid grid-cols-2 gap-2">

                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2">
                                <span className="text-sm">📍</span>

                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400">
                                        Location
                                    </p>

                                    <p className="truncate text-xs font-medium text-gray-700">
                                        {event.location}
                                    </p>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2">
                                <span className="text-sm">📅</span>

                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400">
                                        Date
                                    </p>

                                    <p className="truncate text-xs font-medium text-gray-700">
                                        {event.date}
                                    </p>
                                </div>
                            </div>


                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2">
                                <span className="text-sm">🕒</span>

                                <div>
                                    <p className="text-[10px] text-gray-400">
                                        Time
                                    </p>

                                    <p className="text-xs font-medium text-gray-700">
                                        {event.time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2">
                                <span className="text-sm">💳</span>

                                <div>
                                    <p className="text-[10px] text-gray-400">
                                        Type
                                    </p>

                                    <p className="text-xs font-medium text-gray-700">
                                        {event?.isPaid ? `Paid / ${event?.eventType}` : `Free / ${event?.eventType}`}
                                    </p>
                                </div>
                            </div>


                        </div>


                        <button
                            className={`mt-4 w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${event.isJoined
                                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            disabled={event.isJoined}
                            onClick={() => handleRegistration(event)}
                        >
                            {event.isJoined
                                ? "✓ Already Registered"
                                : "Register for Event"}
                        </button>

                    </div>

                </div>
            ))}


            <Reservation
                open={openDialog}
                setOpen={setOpenDialog}
                eventObj={eventObj}
            />
            <InputDialogBox open={openInputDialog} setOpen={setOpenInputDialog}
                detailsObj={regDetails} setDetailsObj={setRegDetails} handleRegister={handleRegister} />
        </div>
    )



}

export default EventCard;