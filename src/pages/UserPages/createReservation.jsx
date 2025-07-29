import React from 'react'
import { useState } from 'react'
import Sidebar from './useSidebar';
function createReservation() {
   const [reservation, setReservation] = useState({
    userId: '',
    chairId: '',
    reservationDate: '',
    startTime: '',
    endTime: ''
  });
  return (
    <div className="flex min-h-screen bg-gray-100">

     <Sidebar />

        <div className="flex-1 p-6 bg-gray-100 ml-70">
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-gray-400 rounded">
      <h2 className="text-xl font-semibold mb-4">Yeni Rezervasyon Oluştur</h2>
      <form  className="space-y-4">
        <input
          type="text"
          name="userId"
          placeholder="Kullanıcı ID"
          value={reservation.userId}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="chairId"
          placeholder="Koltuk ID"
          value={reservation.chairId}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="reservationDate"
          value={reservation.reservationDate}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="startTime"
          value={reservation.startTime}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="endTime"
          value={reservation.endTime}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Rezervasyon Oluştur
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default createReservation
