import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "./UserLayout";
import { getData } from "../../apiService";

export default function ChairAvailabilityPage() {
  const { adminId } = useParams();
  const [reservation, setReservation] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchReservations() {
      try {
        const data = await getData(`/store/getAvailableSlots/${adminId}`);
        if (isMounted) {
          setReservation(data);

          // Tüm tarihleri topla
          const allDates = Object.keys(data[0]?.slots || {});
          // İlk 7 günü filtrele
          const firstSevenDays = allDates.slice(0, 7);
          setAvailableDates(firstSevenDays);
          setSelectedDate(firstSevenDays[0] || "");
        }
      } catch (err) {
        console.error("Veri alınırken hata oluştu:", err);
      }
    }

    fetchReservations();

    return () => {
      isMounted = false;
    };
  }, [adminId]);

  if (!reservation.length) {
    return (
      <UserLayout>
        <div className="p-6">Kayıt bulunamadı.</div>
      </UserLayout>
    );
  }

  // Store adını ilk kayıttan çekelim
  const storeName = reservation[0]?.store || "Bilinmeyen Mağaza";

  return (
    <UserLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Sandalye Müsaitlik Durumu (Admin ID: {adminId})
          </h2>

          {/* Tarih seçici */}
          <select
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        {reservation.map((reservation) => (
          <div key={reservation.chairId} className="mb-8">
            <h3 className="text-lg font-medium mb-2">{reservation.chairName}</h3>
            <div className="overflow-x-auto">
              <table className="border-collapse border w-full text-sm">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-200">Tarih</th>
                    {Object.keys(Object.values(reservation.slots)[0]).map((time) => (
                      <th key={time} className="border p-2 bg-gray-200">
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Sadece seçili tarihi göster */}
                  {Object.entries(reservation.slots)
                    .filter(([date]) => date === selectedDate)
                    .map(([date, times]) => (
                      <tr key={date}>
                        <td className="border p-2">{date}</td>
                        {Object.entries(times).map(([time, available]) => (
                          <td
                            key={time}
                            className={`border p-2 ${
                              available ? "bg-green-200" : "bg-red-200"
                            }`}
                          >
                            {available ? "✅" : "❌"}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}
