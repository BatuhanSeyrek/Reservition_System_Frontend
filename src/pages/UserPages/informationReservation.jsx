import React from 'react'
import Sidebar from './useSidebar';
function informationReservation() {
    const reservations = [
        { id: 1, userId: '123', chairId: 'A1', reservationDate: '2023-10-01', startTime: '10:00', endTime: '11:00' },
        { id: 2, userId: '456', chairId: 'B2', reservationDate: '2023-10-02', startTime: '12:00', endTime: '13:00' },
        { id: 3, userId: '789', chairId: 'C3', reservationDate: '2023-10-03', startTime: '14:00', endTime: '15:00' }
    ];
  return (
    <div className="flex min-h-screen bg-gray-100">

     <Sidebar />

    <div className="flex-1 p-6 bg-gray-100 ml-70 ">
    <div className="max-w-md mx-auto mt-1 justify-left items-left ml-0">
      <h2 className="text-xl font-semibold mb-4 ">Information Reservation</h2>
       {reservations.map(reservation => (
        <div key={reservation.id} className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow ">
          <p><strong>User ID:</strong> {reservation.userId}</p>
            <p><strong>Chair ID:</strong> {reservation.chairId}</p>
            <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
            <p><strong>Start Time:</strong> {reservation.startTime}</p>
            <p><strong>End Time:</strong> {reservation.endTime}</p>
        </div>
      ))}

    </div>  
    </div>
    </div>
  )
}

export default informationReservation
