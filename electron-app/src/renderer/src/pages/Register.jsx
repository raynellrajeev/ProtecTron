import React, { useState } from 'react'
import axios from 'axios' // ✅ Import axios
import { FaUser, FaLock } from 'react-icons/fa'
import Logo from '../assets/images/Logo.png'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmpassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: formData.username,
        password: formData.password
      })

      alert(response.data.message)
      navigate('/login') // ✅ Redirect to login page after success
    } catch (error) {
      alert('Registration Failed: ' + (error.response?.data.error || 'Server error'))
    }
  }

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <Link to="/Welcome">
        <div className="flex justify-center mb-6">
          <img
            className="logo-image w-[35vh] transition-filter duration-500 ease-out hover:filter hover:drop-shadow-[0_0_0.7rem_rgba(255,255,255,0.5)]"
            src={Logo}
            alt="ProtecTron"
          />
        </div>
      </Link>
      <div className="bg-[rgba(48,48,48,0.3)] border-2 border-[rgba(255,255,255,0.2)] backdrop-blur-[80px] w-[420px] text-white rounded-[10px] p-[30px_40px]">
        <form onSubmit={handleSubmit}>
          {' '}
          {/* ✅ FIX: Using correct onSubmit */}
          <h3 className="text-3xl text-center mb-6">Register</h3>
          <div className="relative w-full h-[50px] my-[30px]">
            <input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full h-full bg-transparent border-none outline-none rounded-[40px] text-base text-white px-[20px] py-[20px] pr-[45px] placeholder-white/50"
            />
            <FaUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
          </div>
          <div className="relative w-full h-[50px] my-[30px]">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full h-full bg-transparent border-none outline-none rounded-[40px] text-base text-white px-[20px] py-[20px] pr-[45px] placeholder-white/50"
            />
            <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
          </div>
          <div className="relative w-full h-[50px] my-[30px]">
            <input
              onChange={handleChange}
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              required
              className="w-full h-full bg-transparent border-none outline-none rounded-[40px] text-base text-white px-[20px] py-[20px] pr-[45px] placeholder-white/50"
            />
            <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-base" />
          </div>
          <button
            type="submit"
            className="w-full h-[45px] bg-white text-black shadow-[0_0_10px_rgba(0,0,0,0.1)] border-none rounded-[40px] text-base font-bold cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  )
}

export default Register
