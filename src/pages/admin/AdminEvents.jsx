import React, { useState } from 'react';
import EventList from '../../components/admin/EventList';
import CreateEvent from '../../components/admin/CreateEvent';
import AdminHome from './AdminHome'

function AdminEvents() {
    const [refreshList, setRefreshList] = useState(0)

    function triggerRefresh() {
        setRefreshList((prev) => prev + 1)
    }

    return (
        <>
            <AdminHome>
                <div className="h-full overflow-hidden bg-gray-50 text-gray-800 antialiased">

                    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                        <CreateEvent onRefresh={triggerRefresh} />
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <EventList refreshList={refreshList} />
                            </div>
                        </div>

                    </main>
                </div>
            </AdminHome>
        </>
    )
}

export default AdminEvents