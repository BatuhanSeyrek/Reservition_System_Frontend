import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-regular-svg-icons';
function OwnerLogin() {


  return (
    <div class="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-2 rounded-2xl shadow-md w-full max-w-md mb-2">
              <Link to="/" className="flex items-center justify-center text-blue-600 hover:underline">
                for admin click here<FontAwesomeIcon icon={faHandPointer} />
              </Link>
      </div>
      
  <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Admin Panel Login</h2>
    
    <form action="#" method="POST" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Admin Email</label>
        <input type="email" id="email" name="email" required
          class="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" required
          class="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500" />
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox" class="form-checkbox text-gray-600" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" class="text-sm text-gray-500 hover:underline">Forgot password?</a>
      </div>

      <button type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
        Login as Admin
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Don’t have an admin account?
      <Link to="/ownerRegister" class="text-blue-600 hover:underline">
        Register here
      </Link>
    </p>
  </div>

</div>
  );
}

export default OwnerLogin;
