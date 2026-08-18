import React, { useState } from 'react';
import EventList from '../../components/admin/EventList';
import CreateEvent from '../../components/admin/CreateEvent';
import Header from '../../components/layout/Header';
import AdminHome from './AdminHome';

function Dashboard() {

    return (
        <AdminHome>
            <div>
                <h1>Welcome Admin</h1>
            </div>
        </AdminHome>
    );
}

export default Dashboard;
