import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
function AdminRegister() {
  return (
     <div class="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex items-center justify-center p-4">

    <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">Admin Registration</h2>
        <p class="text-sm text-gray-500 mt-2">Create a new admin account</p>
      </div>

      <form action="#" method="POST" class="space-y-4">
        <div>
          <label for="adminname" class="block text-sm font-semibold text-gray-700">Admin Name</label>
          <input type="text" id="adminname" name="adminname" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
        </div>
        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
          <input type="password" id="password" name="password" required
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
        </div>

        <div>
          <label for="store" class="block text-sm font-semibold text-gray-700">Store Name</label>
          <input type="text" id="store" name="store" required
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
        <Link to="/adminLogin" class="text-blue-600 hover:underline">
        Login here
        </Link>
      </p>
    </div>

  </div>
  )
}

export default AdminRegister
