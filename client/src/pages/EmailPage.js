import React, { useState } from 'react';
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EmailPage = () => {
  const [data, setData] = useState({
    email: '',
  });
  const navigate = useNavigate()

  const handleonChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation()


    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
      const response = await axios.post(URL, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          email: '',
        })
        navigate('/password',{
          state:response?.data?.data
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  }
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4">
        <div className='w-fit mx-auto'>
          <PiUserCircle size={80} />
        </div>
        <h3>Welcome to Chat app!</h3>

        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.email}
              onChange={handleonChange}
              required
            />
          </div>
          <button className='bg-primary px-4 text-lg py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide'>
            Let's Go
          </button>
        </form>
        <p className='my-3 text-center' >New User ? <Link to={'/register'} className='text-primary hover:text-red-600   font-semibold'>Register</Link></p>
      </div>
    </div>
  )
}

export default EmailPage
