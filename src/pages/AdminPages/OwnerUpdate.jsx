import React from 'react'
import Sidebar from './ownerSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function OwnerUpdate() {
const admin = {
  adminName: "Batuhan Seyrek",
  password: "Batuhan.62",
  storeName: "Arzum Kırtasiye",
};
  return (
     <div className="flex min-h-screen bg-gray-100">

     <Sidebar />
  <div className="flex-1 p-6 bg-gray-100 w-full max-w-md justify-center items-center mx-auto mt-auto border-2 border-gray-400 rounded shadow my-auto ">
        
      <div class="text-center ">
        <h2 class="text-3xl font-bold text-gray-800">Admin Revision</h2>

      </div>

      <form action="#" method="POST" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-semibold text-gray-700">Admin Name</label>
          <input type="text" id="name" name="name" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={admin.adminName} />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
          <input type="password" id="password" name="password" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={admin.password}/>
        </div>

        <div>
          <label for="phone" class="block text-sm font-semibold text-gray-700">Store Name</label>
          <input type="tel" id="phone" name="phone" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={admin.storeName}/>
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
          Update
        </button>
      </form>

    </div>
        
        
        
        </div>
   
  )
}

export default OwnerUpdate
