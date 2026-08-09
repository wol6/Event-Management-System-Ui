import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import UserHome from './pages/user/UserHome'
import Dashboard from './pages/admin/Dashboard'
import ExploreEvents from './pages/ExploreEvents'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/explore" element={<ExploreEvents/>} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  )
}

export default App
