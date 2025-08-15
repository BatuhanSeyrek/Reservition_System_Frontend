import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "./UserLayout";
import { getData, postData } from "../../apiService";

export default function ChairAvailabilityPage() {
  const { adminId } = useParams();
  const [reservation, setReservation] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch data
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
      console.error("Error fetching data:", err);
    }
  };

  const handleReservationClick = async (chairId, time) => {
    const confirmCreate = window.confirm(
      `Are you sure you want to create a reservation for ${selectedDate} at ${time}?`
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
      alert("Reservation created successfully!");

      // Update the list directly from state
      setReservation((prev) =>
        prev.map((res) =>
          res.chairId === chairId
            ? {
                ...res,
                slots: {
                  ...res.slots,
                  [selectedDate]: {
                    ...res.slots[selectedDate],
                    [time]: false, // Mark as unavailable
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
        <div className="p-6">No records found.</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="p-6">
        {/* Title on the left - Date selector on the right */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Chair Availability</h2>

          <div className="flex items-center gap-2">
            <label htmlFor="dateSelect" className="font-medium">
              Select Date:
            </label>
            <select
              id="dateSelect"
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
        </div>

        {/* Chairs displayed in a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reservation.map((res) => (
            <div
              key={res.chairId}
              className="border rounded p-4 bg-gray-50 shadow"
            >
              <h3 className="text-lg font-medium mb-4 text-center">
                {res.chairName}
              </h3>

              <div className="flex flex-col gap-2">
                {Object.entries(res.slots[selectedDate] || {}).map(
                  ([time, available]) => (
                    <div
                      key={time}
                      className={`p-2 border rounded text-center cursor-pointer transition ${
                        available
                          ? "bg-green-200 hover:bg-green-300"
                          : "bg-red-200 cursor-not-allowed"
                      }`}
                      onClick={() =>
                        available && handleReservationClick(res.chairId, time)
                      }
                    >
                      {time} — {available ? "✅" : "❌"}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
