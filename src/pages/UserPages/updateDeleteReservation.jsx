import React, { useState, useEffect } from 'react';
import { deleteData, getData, postData, putData } from '../../apiService';
import UserLayout from './UserLayout';

function ReservationDeleteUpdate() {
  const [reservationList, setReservationList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [chairList, setChairList] = useState([]);

  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [selectedChairId, setSelectedChairId] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [editReservationId, setEditReservationId] = useState(null);

  const token = localStorage.getItem('token');

  // Tüm rezervasyonları getir
  const fetchReservations = async () => {
    try {
      const response = await getData('/store/userReservationGet');
      setReservationList(response.data || response);
    } catch (err) {
      console.error("Liste çekme hatası:", err);
    }
  };

  // Store listesini getir
  const fetchStores = async () => {
    try {
      const res = await getData('/store/storeAll');
      const simplifiedStores = (res.data || res).map(item => item.store);
      setStoreList(simplifiedStores);
    } catch (err) {
      console.error("Store listesi çekilirken hata:", err);
    }
  };

  // Seçilen store'a göre chair listesini getir
  const fetchChairs = async (storeId) => {
    if (!storeId) {
      setChairList([]);
      return;
    }
    try {
      const res = await getData(`/store/chairgetbystore/${storeId}`);
      setChairList(res.data || res);
    } catch (err) {
      console.error("Chair listesi çekilirken hata:", err);
      setChairList([]);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchStores();
  }, [token]);

  // Store seçimi değiştiğinde chair listesini güncelle
  useEffect(() => {
    if (selectedStoreId) {
      fetchChairs(Number(selectedStoreId));
    } else {
      setChairList([]);
    }
    setSelectedChairId('');
  }, [selectedStoreId]);

  // chairList güncellendiğinde ve edit modundaysak, seçili reservation'ın chairId'sini setle
  useEffect(() => {
    if (editMode && editReservationId && chairList.length > 0) {
      const currentReservation = reservationList.find(r => r.id === editReservationId);
      if (currentReservation) {
        setSelectedChairId(currentReservation.chairId?.toString() || '');
      }
    }
  }, [chairList]);

  const handleStoreChange = (e) => {
    const val = e.target.value;
    setSelectedStoreId(val);
    if (val) {
      fetchChairs(Number(val));
    } else {
      setChairList([]);
    }
    setSelectedChairId('');
  };

  const handleEdit = (reservation) => {
    setEditMode(true);
    setEditReservationId(reservation.id);
    setSelectedStoreId(reservation.storeId?.toString() || '');
    setReservationDate(reservation.reservationDate || '');
    setStartTime(reservation.startTime || '');
    // selectedChairId burada setlenmiyor, useEffect görevi devralıyor
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStoreId || !selectedChairId || !reservationDate || !startTime) {
      return alert("Lütfen tüm alanları doldurun.");
    }

    try {
      const payload = {
        storeId: Number(selectedStoreId),
        chairId: Number(selectedChairId),
        reservationDate,
        startTime
      };

      if (editMode) {
        await putData(`/store/reservationUpdate/${editReservationId}`, payload);
        alert("Rezervasyon başarıyla güncellendi.");
      } else {
        await postData("/store/create", payload);
        alert("Rezervasyon başarıyla eklendi!");
      }

      await fetchReservations();

      setEditMode(false);
      setEditReservationId(null);
      setSelectedStoreId('');
      setSelectedChairId('');
      setReservationDate('');
      setStartTime('');
    } catch (err) {
      console.error("İşlem hatası:", err);
      alert("İşlem hatası: " + (err.response?.data || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu rezervasyonu silmek istediğinizden emin misiniz?")) {
      try {
        await deleteData(`/store/userReservationDelete/${id}`);
        await fetchReservations();
        alert("Rezervasyon başarıyla silindi.");
      } catch (err) {
        console.error("Silme hatası:", err);
        alert("Silme hatası: " + (err.response?.data || err.message));
      }
    }
  };

  return (
    <UserLayout>
      <div className="flex gap-6">
        {/* Sol: Rezervasyon Listesi */}
        <div className="max-w-md mx-auto mt-1 w-1/2">
          <h2 className="text-xl font-semibold mb-4">Information Reservation</h2>
          {reservationList.length === 0 && <p>Henüz rezervasyon bulunmamaktadır.</p>}
          {reservationList.map(reservation => (
            <div
              key={reservation.id}
              className="bg-white p-4 mb-4 border-2 rounded shadow flex"
            >
              <div className="w-3/4">
                <p><strong>Store Name:</strong> {reservation.storeName}</p>
                <p><strong>User Name:</strong> {reservation.userName}</p>
                <p><strong>Chair Name:</strong> {reservation.chairName}</p>
                <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
                <p><strong>Start Time:</strong> {reservation.startTime}</p>
                <p><strong>End Time:</strong> {reservation.endTime}</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-end gap-2 text-xl">
                <button
                  onClick={() => handleEdit(reservation)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sağ: Form */}
        <div className="w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Reservation" : "Create Reservation"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Select Store</label>
              <select
                value={selectedStoreId}
                onChange={handleStoreChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">-- Select Store --</option>
                {storeList.map((store, index) => (
                  <option key={store.id ?? index} value={store.id}>
                    {store.storeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Select Chair</label>
              <select
                value={selectedChairId}
                onChange={(e) => setSelectedChairId(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                disabled={!selectedStoreId}
                required
              >
                <option value="">-- Select Chair --</option>
                {chairList.map((chair, index) => (
                  <option key={chair.id ?? index} value={chair.id}>
                    {chair.chairName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Reservation Date</label>
              <input
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editMode ? "Update" : "Create"}
              </button>

              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditReservationId(null);
                    setSelectedStoreId('');
                    setSelectedChairId('');
                    setReservationDate('');
                    setStartTime('');
                  }}
                  className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}

export default ReservationDeleteUpdate;
