import React, { useEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import Loader from '../layout/Loader'

function MyEvents({ openMyEvent, setOpenMyEvent }) {
  const dialogRef = useRef(null)
  const [isLoading, setIsloading] = useState(false)
  const [detailsArr, setDetailsArr] = useState([])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (openMyEvent) {
      dialog.showModal()
      getEvents()
    } else {
      dialog.close()
    }
  }, [openMyEvent])

  async function getEvents() {
    setIsloading(true)
    try {
      const { data: resp } = await api.get('/get-user-events')
      if (resp.success) {
        setDetailsArr(resp.details)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpenMyEvent(false)}
      className="w-screen h-screen max-w-none max-h-none m-0 border-0 bg-white shadow-none backdrop:bg-black/50"
    >
      <div className="w-full h-full flex flex-col bg-white">

        {/* Sticky Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white shrink-0">
          <h2 className="text-2xl font-bold text-blue-900">My Registered Events</h2>
          <button
            onClick={() => setOpenMyEvent(false)}
            className="text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          {detailsArr.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-3">🎟️</div>
                <p className="font-medium">No events registered.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {detailsArr.map((item, index) => {
                const details = item.eventDetails?.[0] || {};

                const seats = Array.isArray(item.seatNos)
                  ? item.seatNos.flat()
                  : [];

                return (
                  <div
                    key={item._id || index}
                    className="
              relative overflow-hidden
              min-h-[220px]
              rounded-xl
              border border-blue-100
              shadow-sm
              bg-gradient-to-tr
              from-blue-900
              via-blue-50
              to-white
            "
                  >
                    <div className="relative h-full min-h-[220px] flex flex-col">

                      <div className="px-5 pt-5 flex items-start justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.25em] text-blue-700 font-semibold">
                            Entry Pass
                          </p>

                          <h2 className="text-xl font-bold text-gray-900 mt-1">
                            {details.title || "Event"}
                          </h2>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest text-gray-500">
                            Pass
                          </p>

                          <p className="text-sm font-bold text-gray-800">
                            #{index + 1}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 mt-auto pb-5">

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                              Date
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {details.date || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                              Time
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {details.time || "N/A"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                              Location
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
                              {details.location || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Ticket divider */}
                        <div className="border-t border-dashed border-blue-300 my-4" />

                        {/* Bottom */}
                        <div className="flex items-end justify-between">

                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                              Guests
                            </p>

                            <p className="text-sm font-bold text-gray-900 mt-1">
                              {item.headCount || 0}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                              Seats
                            </p>

                            <div className="flex gap-1.5 mt-1">
                              {seats.length > 0 ? (
                                seats.map((seat, i) => (
                                  <span
                                    key={i}
                                    className="
                              px-2 py-1
                              text-xs font-semibold
                              rounded
                              bg-white/80
                              border border-blue-200
                              text-blue-700
                            "
                                  >
                                    {seat}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-blue-900">
                                  open
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                              Status
                            </p>

                            <span
                              className="
                        inline-block
                        mt-1
                        px-2 py-1
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-[10px]
                        font-bold
                      "
                            >
                              CONFIRMED
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
      {isLoading && <Loader/>}
    </dialog>
  )
}

export default MyEvents
