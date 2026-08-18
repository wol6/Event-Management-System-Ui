import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import UserHome from './pages/user/UserHome'
import ExploreEvents from './pages/ExploreEvents'
import { Toaster } from './components/ui/sonner'
import AdminHome from './pages/admin/AdminHome'
import AdminEvents from './pages/admin/AdminEvents'
import Dashboard from './pages/admin/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/explore" element={<ExploreEvents/>} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  )
}

export default App
