import React from 'react'
import Sidebar from './useSidebar'

function UserInformation() {
  const user = {
    mail: "batuhan@gmail.com",
    name: "Batuhan",
    phone: "05438236265",
    notificationType: "SMS",
    password: "Batuhan.62"
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex justify-center items-start mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            My Information
          </h1>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold text-gray-600">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Email:</span> {user.mail}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Notification:</span> {user.notificationType}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Password:</span> {user.password}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInformation
