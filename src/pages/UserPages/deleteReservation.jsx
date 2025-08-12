import React from 'react';
import UserLayout from './UserLayout'; // Yolun projene göre olabilir
import { useEffect,useState } from 'react';
import { deleteData, getData} from '../../apiService';
function DeleteReservation() {
      const [reservations, setReservations] = useState([]);
      const handleDelete = async (id) => {
          if (window.confirm("Bu rezervasyonu silmek istediğinizden emin misiniz?")) {
            try {
              await deleteData(`/store/userReservationDelete/${id}`);
              setReservations(reservations.filter(reservations => reservations.id !== id));
              alert("Çalışan başarıyla silindi.");
            } catch (err) {
              console.error("Çalışan silinirken hata oluştu:", err);
              alert("Silme işlemi sırasında hata oluştu: " + (err.response?.data || err.message));
            }
          }
        };
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
      <div className="max-w-md mx-auto mt-1">
        <h2 className="text-xl font-semibold mb-4">Information Reservation</h2>
        {reservations.map(reservation => (
          <div key={reservation.id} className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex">
            <div className="w-3/4">
              <p><strong>Store Name:</strong> {reservation.storeName}</p>
              <p><strong>User Name:</strong> {reservation.userName}</p>
              <p><strong>Chair Name:</strong> {reservation.chairName}</p>
              <p><strong>Reservation Date:</strong> {reservation.reservationDate}</p>
              <p><strong>Start Time:</strong> {reservation.startTime}</p>
              <p><strong>End Time:</strong> {reservation.endTime}</p>
              {console.log("Silinecek reservation:", reservation)}
            </div>
            <div className="w-1/4 flex items-center justify-end">
              <button className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleDelete(reservation.id)}>
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
