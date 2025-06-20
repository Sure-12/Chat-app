import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../component/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const PasswordPage = () => {
  const [data, setData] = useState({
    password: '',
    userId: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!location?.state?.name || !location?.state?._id) {
      navigate('/email');
    } else {
      // Add userId to state
      setData((prev) => ({
        ...prev,
        userId: location.state._id
      }));
    }
  }, [location, navigate]);

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(URL, data, {
        userId: location?.state?._id,
        password: data.password,
        withCredentials: true // ⬅️ ensures cookies are saved
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)
        setData({ password: '', userId: '' });
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4">
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-lg mt-1">{location?.state?.name}</h2>
        </div>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleonChange}
              required
            />
          </div>
          <button className="bg-primary px-4 text-lg py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide">
            Login
          </button>
        </form>
        <p className="my-3 text-center">
          <Link to={'/forgot-password'} className="hover:text-primary font-semibold">
            Forgot password ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordPage;
