import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { postData } from '../../apiService';
function HomePage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  

        // Giriş isteği
        const response = await postData("/user/login", {
          username,
          password
        });
        localStorage.setItem("token",response.token)
        navigate("/userAbout");
      
    };
  
  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex flex-col items-center justify-center">
      
      <div className="bg-white p-2 rounded-2xl shadow-md w-full max-w-md mb-2">
        <Link to="/ownerLogin" className="flex items-center justify-center text-blue-600 hover:underline">
          for admin click here<FontAwesomeIcon icon={faHandPointer} />
        </Link>
      </div>

       <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Sign In to Your Account</h2>
    
    <form onSubmit={handleLogin} class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">User Name</label>
        <input type="text" id="username" name="username" required  onChange={e => setUserName(e.target.value)} value={username}
          class="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} value={password}
          class="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox" class="form-checkbox text-blue-600" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>

      </div>

      <button type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
        Login
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600 flex gap-2 items-center justify-center">
      Don’t have an account?
      <Link to="/userRegister" className="flex items-center justify-center text-blue-600 hover:underline">
          Sing up
        </Link>
    </p>
  </div>
    </div>
  );
}

export default HomePage;
