import React from 'react';
import UserLayout from './UserLayout'; // Yolun projene göre olabilir

function DeleteReservation() {
  const reservations = [
    { id: 1, userId: '123', chairId: 'A1', reservationDate: '2023-10-01', startTime: '10:00', endTime: '11:00' },
    { id: 2, userId: '456', chairId: 'B2', reservationDate: '2023-10-02', startTime: '12:00', endTime: '13:00' },
    { id: 3, userId: '789', chairId: 'C3', reservationDate: '2023-10-03', startTime: '14:00', endTime: '15:00' }
  ];

  return (
    <UserLayout>
      <div className="max-w-md mx-auto mt-1">
        <h2 className="text-xl font-semibold mb-4">Information Reservation</h2>
        {reservations.map(reservation => (
          <div key={reservation.id} className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex">
            <div className="w-3/4">
              <p><strong>User ID:</strong> {reservation.userId}</p>
              <p><strong>Chair ID:</strong> {reservation.chairId}</p>
              <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
              <p><strong>Start Time:</strong> {reservation.startTime}</p>
              <p><strong>End Time:</strong> {reservation.endTime}</p>
            </div>
            <div className="w-1/4 flex items-center justify-end">
              <button className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}

export default DeleteReservation;
