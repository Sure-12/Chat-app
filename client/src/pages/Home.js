import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../component/Sidebar'
import logo from '../assets/logo.png'
import io from 'socket.io-client'

const Home = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log("user", user)

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response = await axios({
        method: 'get',
        url: URL,
        withCredentials: true
      })

      const { data, logout: shouldLogout } = response?.data || {}


      if (data && typeof data === 'object') {
        dispatch(setUser(data))
      } else {
        console.warn("Invalid user data received:", data)
      }

      if (shouldLogout.data) {
        dispatch(logout())
        navigate('/email')
      }

      console.log("current user details", response)
    } catch (error) {
      console.error("Error", error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  // socket connection
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    })

    socketConnection.on('onlineUser', (data) => {
      const uniqueIds = Array.from(new Set(data))
      console.log("Received online users:", data)
      console.log("Unique online users:", uniqueIds)
      dispatch(setOnlineUser(uniqueIds)) // optional, extra protection
    })

    dispatch(setSocketConnection(socketConnection))
    return () => {
      socketConnection.disconnect()
    }
  }, [])


  const basePath = location.pathname === '/'

  return (
    <div className='grid  lg:grid-cols-[300px_1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className={` justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img src={logo} alt="" width={250} />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>

    </div>
  )
}

export default Home
