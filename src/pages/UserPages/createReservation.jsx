import React, { useState } from 'react';
import UserLayout from './UserLayout'; // Yolunu projenin yapısına göre ayarla

function CreateReservation() {
  const [reservation, setReservation] = useState({
    userId: '',
    chairId: '',
    reservationDate: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // rezervasyon gönderme işlemleri burada yapılabilir
    console.log("Yeni rezervasyon:", reservation);
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto mt-10 p-6 border-2 border-gray-400 rounded bg-white shadow my-auto">
        <h2 className="text-xl font-semibold mb-4">Yeni Rezervasyon Oluştur</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="Kullanıcı ID"
            value={reservation.userId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="chairId"
            placeholder="Koltuk ID"
            value={reservation.chairId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="reservationDate"
            value={reservation.reservationDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            name="startTime"
            value={reservation.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            name="endTime"
            value={reservation.endTime}
            onChange={handleChange}
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
    </UserLayout>
  );
}

export default CreateReservation;
