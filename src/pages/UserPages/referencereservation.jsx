import React, { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import { postData } from "../../apiService";
import { Scissors, Calendar, Clock } from "lucide-react";

export default function ChairAvailabilityPageReference() {
  const [reservation, setReservation] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Modal içinde form state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentChair, setCurrentChair] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerSurname, setCustomerSurname] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const referenceId = localStorage.getItem("referenceId");
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (referenceId) fetchReservations();
    else console.error("referenceId bulunamadı!");
  }, [referenceId]);

  const fetchReservations = async () => {
    try {
      const data = await postData("/store/getAvailableSlotsReference", { referenceId });
      setReservation(data);

      const allDates = Object.keys(data[0]?.slots || {});
      const firstSevenDays = allDates.slice(0, 7);
      setAvailableDates(firstSevenDays);
      setSelectedDate(firstSevenDays[0] || "");
    } catch (err) {
      console.error("Veri çekilirken hata oluştu:", err);
    }
  };

  const handleOpenModal = (chairId, time) => {
    setCurrentChair(chairId);
    setCurrentTime(time);
    setModalOpen(true);
  };

  const handleConfirmReservation = async () => {
    if (!customerName || !customerSurname || !customerPhone) {
      alert("Lütfen müşteri adı, soyadı ve telefon bilgilerini doldurun!");
      return;
    }

    try {
      const payload = {
        storeId: Number(adminId),
        chairId: Number(currentChair),
        reservationDate: selectedDate,
        startTime: currentTime,
        customerName,
        customerSurname,
        customerPhone,
      };

      await postData("/store/referenceReservationAdd", payload);
      alert("Rezervasyon başarıyla oluşturuldu!");

      setReservation((prev) =>
        prev.map((res) =>
          res.chairId === currentChair
            ? {
                ...res,
                slots: {
                  ...res.slots,
                  [selectedDate]: {
                    ...res.slots[selectedDate],
                    [currentTime]: false,
                  },
                },
              }
            : res
        )
      );

      setModalOpen(false);
      setCustomerName("");
      setCustomerSurname("");
      setCustomerPhone("");
    } catch (err) {
      console.error("Rezervasyon hatası:", err);
      alert("Rezervasyon oluşturulurken bir hata oluştu!");
    }
  };

  if (!reservation.length) {
    return (
      <UserLayout>
        <div className="p-6 text-center text-gray-500 text-lg">
          Müsait koltuk bulunamadı.
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-6">
        {/* Başlık & Tarih Seçici */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-red-600">
            <Scissors className="w-6 h-6" /> Koltuk Durumu
          </h2>
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow border">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              className="border p-2 rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {availableDates.map((date) => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Koltuk Listesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reservation.map((res) => (
            <div key={res.chairId} className="rounded-2xl overflow-hidden shadow-lg bg-white border">
              <div className="relative h-36 bg-red-100 flex items-center justify-center">
                <img
                  src="https://static.thenounproject.com/png/7786343-512.png"
                  className="h-28"
                  alt={res.chairName}
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-center mb-3">{res.chairName}</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(res.slots[selectedDate] || {}).map(
                    ([time, available]) => (
                      <div
                        key={time}
                        className={`p-3 rounded-lg text-center font-medium border cursor-pointer ${
                          available ? "bg-green-200" : "bg-red-200 cursor-not-allowed"
                        }`}
                        onClick={() => available && handleOpenModal(res.chairId, time)}
                      >
                        <Clock className="w-4 h-4 inline" /> {time} – {available ? "Müsait" : "Dolu"}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Müşteri Bilgileri ve Onay</h3>
            
            {/* Modal içi form */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                className="border p-4 rounded-lg h-12 text-base w-full"
                placeholder="Müşteri Adı"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                type="text"
                className="border p-4 rounded-lg h-12 text-base w-full"
                placeholder="Müşteri Soyadı"
                value={customerSurname}
                onChange={(e) => setCustomerSurname(e.target.value)}
              />
              <input
                type="tel"
                className="border p-4 rounded-lg h-12 text-base w-full"
                placeholder="Telefon Numarası"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            <p className="mb-4">
              {customerName} {customerSurname} için {selectedDate} / {currentTime} saatinde rezervasyon oluşturulsun mu?
            </p>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                İptal
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleConfirmReservation}
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
