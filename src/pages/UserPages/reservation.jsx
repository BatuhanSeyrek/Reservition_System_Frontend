import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "./UserLayout";
import { getData, postData } from "../../apiService";
import { Scissors, Calendar, Clock } from "lucide-react";

export default function ChairAvailabilityPage() {
  const { adminId } = useParams();
  const [reservation, setReservation] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchReservations();
  }, [adminId]);

  const fetchReservations = async () => {
    try {
      const data = await getData(`/store/getAvailableSlots/${adminId}`);
      setReservation(data);

      const allDates = Object.keys(data[0]?.slots || {});
      const firstSevenDays = allDates.slice(0, 7);

      setAvailableDates(firstSevenDays);
      setSelectedDate((prev) => prev || firstSevenDays[0] || "");
    } catch (err) {
      console.error("Veriler alınırken hata oluştu:", err);
    }
  };

  const handleReservationClick = async (chairId, time) => {
    const confirmCreate = window.confirm(
      `${selectedDate} tarihinde ${time} saatine rezervasyon oluşturmak istiyor musunuz?`
    );
    if (!confirmCreate) return;

    try {
      const payload = {
        storeId: Number(adminId),
        chairId: Number(chairId),
        reservationDate: selectedDate,
        startTime: time,
      };

      await postData("/store/create", payload);
      alert("Rezervasyon başarıyla oluşturuldu!");

      setReservation((prev) =>
        prev.map((res) =>
          res.chairId === chairId
            ? {
                ...res,
                slots: {
                  ...res.slots,
                  [selectedDate]: {
                    ...res.slots[selectedDate],
                    [time]: false,
                  },
                },
              }
            : res
        )
      );
    } catch (err) {
      console.error("Rezervasyon hatası:", err);
      alert("Rezervasyon oluşturulurken bir hata oluştu!");
    }
  };

  if (!reservation.length) {
    return (
      <UserLayout>
        <div className="p-6 text-center text-gray-500 text-lg">
          Kayıt bulunamadı.
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-6">
        {/* Başlık ve Tarih Seçici */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4 gap-4 md:gap-0">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-red-600">
            <Scissors className="w-6 h-6" /> Koltuk Müsaitlik Durumu
          </h2>

          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow border">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              className="border p-2 rounded-lg hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
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
        </div>

        {/* Koltuklar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reservation.map((res) => (
            <div
              key={res.chairId}
              className="rounded-2xl overflow-hidden shadow-lg bg-white border hover:shadow-2xl transition duration-200"
            >
              <div className="relative h-36 bg-red-100 flex items-center justify-center">
                <img
                  src="https://static.thenounproject.com/png/7786343-512.png"
                  alt="koltuk-ikon"
                  className="h-28 object-contain drop-shadow-lg"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                  {res.chairName}
                </h3>

                <div className="flex flex-col gap-2">
                  {Object.entries(res.slots[selectedDate] || {}).map(
                    ([time, available]) => (
                      <div
                        key={time}
                        className={`p-3 rounded-lg text-center font-medium border flex items-center justify-center gap-2 cursor-pointer transition duration-200
                          ${
                            available
                              ? "bg-green-200 hover:bg-green-300"
                              : "bg-red-200 cursor-not-allowed opacity-70"
                          }`}
                        onClick={() =>
                          available && handleReservationClick(res.chairId, time)
                        }
                      >
                        <Clock className="w-4 h-4" />
                        {time} — {available ? "Müsait ✅" : "Dolu ❌"}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
