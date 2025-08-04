import React from 'react'
import { useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {postData } from '../../apiService';
function OwnerRegister() {
  const [formData, setFormData] = useState({
    adminName: '',
    password: '',
    storeName: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await postData("/admin/register", formData);
      alert("Kayıt başarılı!");
      navigate("/ownerLogin");
    } catch (err) {
      alert("Hata: " + err.response?.data || err.message);
    }
  };
  return (
     <div class="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Admin Registration</h2>
        <p class="text-sm text-gray-500 mt-2">Create a new admin account</p>
      </div>

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="adminName" class="block text-sm font-semibold text-gray-700">Admin Name</label>
          <input type="text" id="adminName" name="adminName" required value={formData.adminName} onChange={handleChange}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
        </div>
        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
          <input type="password" id="password" name="password" required  value={formData.password} onChange={handleChange}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
        </div>

        <div>
          <label for="storeName" class="block text-sm font-semibold text-gray-700">Store Name</label>
          <input type="text" id="storeName" name="storeName" required  value={formData.storeName} onChange={handleChange}
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
        </div>

        <div class="flex items-center text-sm text-gray-600">
          <input type="checkbox" id="terms" class="form-checkbox text-gray-600" required />
          <label for="terms" class="ml-2">I agree to the <a href="#" class="text-gray-700 underline">terms & conditions</a></label>
        </div>

        <button type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Register as Admin
        </button>
      </form>

      <p class="text-center text-sm text-gray-600">
        Already have an admin account?
        <Link to="/ownerLogin" class="text-blue-600 hover:underline">
        Login here
        </Link>
      </p>
    </div>

  </div>
  )
}

export default OwnerRegister
