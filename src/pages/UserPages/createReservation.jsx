import React, { useState } from 'react';
import axios from 'axios';
import UserLayout from './UserLayout'; // Yolunu projene göre ayarla
import { postData } from '../../apiService';
function CreateReservation() {
  const [reservation, setReservation] = useState({
    chairId: '',
    reservationDate: '',
    startTime: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Backend'e gönderilecek data backend entity yapısına uygun olmalı
      const data = {
        
        chairId:  Number(reservation.chairId) ,
        reservationDate: reservation.reservationDate,
        startTime: reservation.startTime , // "HH:mm:ss" formatı için
        reminderSent: false
      };

       await postData(
        '/store/create',
        data
      );

      setSuccess('Rezervasyon başarıyla oluşturuldu!');
      setReservation({
        chairId: '',
        reservationDate: '',
        startTime: '',
      });
    } catch (err) {
      setError('Rezervasyon oluşturulurken hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-md mx-auto mt-10 p-6 border-2 border-gray-400 rounded bg-white shadow my-auto">
        <h2 className="text-xl font-semibold mb-4">Yeni Rezervasyon Oluştur</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="number"
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Gönderiliyor...' : 'Rezervasyon Oluştur'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </div>
    </UserLayout>
  );
}

export default CreateReservation;
