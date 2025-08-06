import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from './UserLayout';
import { getData } from '../../apiService';

function InformationReservation() {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
      const fetchReservations = async () => {
      try {
        const data= await getData('/store/userReservationGet')
        setReservations(data)
      } catch (err) {
        console.error("Kullanıcı bilgileri alınırken hata oluştu:", err);
      }
    };
  
    fetchReservations();
  
    }, []);
  return (
    <UserLayout>
      <div className="max-w-md mx-auto py-2">
        <h2 className="text-xl font-semibold mb-4">Information Reservation</h2>
        {reservations.length === 0 && <p>Rezervasyon bulunmamaktadır.</p>}
        {reservations.map(reservation => (
          <div key={reservation.id} className="bg-white p-4 mb-4 border-2 border-gray-300 rounded shadow">
            <p><strong>User Name:</strong> {reservation.userName}</p>
            <p><strong>Chair Name:</strong> {reservation.chairName}</p>
            <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
            <p><strong>Start Time:</strong> {reservation.startTime}</p>
            <p><strong>End Time:</strong> {reservation.endTime}</p>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}

export default InformationReservation;
