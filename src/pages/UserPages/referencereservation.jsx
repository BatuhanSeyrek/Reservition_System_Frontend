import React, { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import { postData } from "../../apiService";
import { Scissors, Calendar, Clock } from "lucide-react";

export default function ChairAvailabilityPageReference() {
  const [reservation, setReservation] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // 🔥 Misafir müşteri bilgileri
  const [customerName, setCustomerName] = useState("");
  const [customerSurname, setCustomerSurname] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // 🔥 LocalStorage
  const referenceId = localStorage.getItem("referenceId");
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (referenceId) fetchReservations();
    else console.error("referenceId not found!");
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
      console.error("Error fetching data:", err);
    }
  };

  const handleReservationClick = async (chairId, time) => {
    // 🔥 Misafir bilgileri validation
    if (!customerName || !customerSurname || !customerPhone) {
      alert("Lütfen müşteri adı, soyadı ve telefon bilgilerini doldurun!");
      return;
    }

    const confirmCreate = window.confirm(
      `Create reservation for ${customerName} ${customerSurname} at ${selectedDate} / ${time}?`
    );
    if (!confirmCreate) return;

    try {
      const payload = {
        storeId: Number(adminId),
        chairId: Number(chairId),
        reservationDate: selectedDate,
        startTime: time,
        customerName,
        customerSurname,
        customerPhone,
      };

      await postData("/store/referenceReservationAdd", payload); // 🔥 Ayrı endpoint
      alert("Reservation created successfully!");

      // Slot durumunu güncelle
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
      console.error("Reservation error:", err);
      alert("An error occurred while creating the reservation!");
    }
  };

  if (!reservation.length) {
    return (
      <UserLayout>
        <div className="p-6 text-center text-gray-500 text-lg">
          No available chairs found.
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-6">

        {/* 🔥 Misafir müşteri formu */}
        <div className="bg-white shadow p-4 rounded-xl mb-8">
          <h3 className="text-lg font-bold mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="text"
              className="border p-2 rounded-lg"
              placeholder="Customer Surname"
              value={customerSurname}
              onChange={(e) => setCustomerSurname(e.target.value)}
            />
            <input
              type="tel"
              className="border p-2 rounded-lg"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Başlık ve Tarih Seçici */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-red-600">
            <Scissors className="w-6 h-6" /> Chair Availability
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
                        onClick={() => available && handleReservationClick(res.chairId, time)}
                      >
                        <Clock className="w-4 h-4 inline" /> {time} – {available ? "Müsait" : "Meşgul"}
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
