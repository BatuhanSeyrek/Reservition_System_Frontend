import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function userRegister() {
    const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    navigatetionType: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/user/register", formData);
      alert("Kayıt başarılı!");
      navigate("/");
    } catch (err) {
      alert("Hata: " + err.response?.data || err.message);
    }
  };
  return (
    
    <div class="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>

      </div>

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="userName" class="block text-sm font-semibold text-gray-700">Name</label>
          <input type="text" id="userName" name="userName" required onChange={handleChange} value={formData.userName}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
          <input type="email" id="email" name="email" required onChange={handleChange} value={formData.email}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label for="phoneNumber" class="block text-sm font-semibold text-gray-700">Phone</label>
          <input type="text" id="phoneNumber" name="phoneNumber" required onChange={handleChange} value={formData.phoneNumber}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label for="navigatetionType" class="block text-sm font-semibold text-gray-700">Notification Type</label>
          <select id="navigatetionType" name="navigatetionType" required onChange={handleChange} value={formData.navigatetionType}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Select...</option>
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="PUSH">Push</option>
          </select>
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
          <input type="password" id="password" name="password" required onChange={handleChange} value={formData.password}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div class="flex items-center justify-between text-sm text-gray-600">
          <label class="flex items-center">
            <input type="checkbox" class="form-checkbox text-blue-600" />
            <span class="ml-2">Remember me</span>
          </label>
          <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
        </div>

        <button type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Login
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
              Already have an user account?
              <Link to="/" class="text-blue-600 hover:underline">
              Login here
              </Link>
            </p>
    </div>

  </div>
  )
}

export default userRegister
