import React from 'react'
import Sidebar from './useSidebar'
import { Link } from 'react-router-dom';
function userUpdate() {
    const user = {
  mail: "batuhan@gmail.com",
  name: "Batuhan",
  phone: "05438236265",
  notificationType: "SMS",
  password: "Batuhan.62"
};
  return (
     <div className="flex min-h-screen bg-gray-100">

     <Sidebar />

        <div className="flex-1 p-6 bg-gray-100 w-full max-w-md justify-center items-center mx-auto mt-3 border-2 border-gray-400 rounded shadow ">
        
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Welcome Back</h2>

      </div>

      <form action="#" method="POST" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-semibold text-gray-700">Name</label>
          <input type="text" id="name" name="name" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={user.name} />
        </div>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
          <input type="email" id="email" name="email" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={user.mail}/>
        </div>

        <div>
          <label for="phone" class="block text-sm font-semibold text-gray-700">Phone</label>
          <input type="tel" id="phone" name="phone" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={user.phone}/>
        </div>

        <div>
          <label for="notificationType" class="block text-sm font-semibold text-gray-700">Notification Type</label>
          <select id="notificationType" name="notificationType" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={user.notificationType}>
            <option value="">Select...</option>
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="PUSH">Push</option>
          </select>
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
          <input type="password" id="password" name="password" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={user.password}/>
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

export default userUpdate
