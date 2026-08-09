import React from 'react'

function SearchPage({setSearchQuery,searchQuery}) {
    return (
        <section className="mb-8 rounded-2xl border border-gray-100 bg-white px-6 py-6 shadow-sm sm:px-8">

            <div className="max-w-3xl">

                <h1 className="text-2xl font-bold text-blue-700 sm:text-3xl">
                    Explore Your Next Event
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Find exciting events, connect with people and reserve your seat.
                </p>

                {/* Search */}
                <div className="relative mt-5 max-w-2xl">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search events by title, location or category..."
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-3.5 pl-11 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />

                </div>

            </div>

        </section>
    )
}

export default SearchPage