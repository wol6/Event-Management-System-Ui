import React from 'react'
import Header from '../../components/layout/Header';
import SideBar from '@/components/layout/SideBar';

function AdminHome({children}) {
    return (
        <>
            <div className="h-screen flex flex-col overflow-hidden">
                <Header />

                <div className="flex flex-1 min-h-0">
                    <SideBar />

                    <main className="flex-1 p-6 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>

        </>
    )
}

export default AdminHome