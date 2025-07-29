import React from 'react';
import Sidebar from './ownerSidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

function ChairList() {
  const chair = [
    { chairid: 1, opneingtime: "09:00 AM", closingtime: "05:00 PM", islemSüresi: "8 hours", chairName: "Chair 1", employee:{employeeName: "Employee 1"},admin:{ adminName: "Admin 1", storeName: "Store 1", chairCount: 20 }},
    { chairid: 2, opneingtime: "10:00 AM", closingtime: "06:00 PM", islemSüresi: "8 hours", chairName: "Chair 2", employee:{employeeName: "Employee 2"},admin:{ adminName: "Admin 2", storeName: "Store 2", chairCount: 15 }},
    { chairid: 3, opneingtime: "08:00 AM", closingtime: "04:00 PM", islemSüresi: "8 hours", chairName: "Chair 3", employee:{employeeName: "Employee 3"},admin:{ adminName: "Admin 3", storeName: "Store 3", chairCount: 25 }},
    { chairid: 4, opneingtime: "09:30 AM", closingtime: "05:30 PM", islemSüresi: "8 hours", chairName: "Chair 4", employee:{employeeName: "Employee 4"},admin:{ adminName: "Admin 4", storeName: "Store 4", chairCount: 30 }},
    { chairid: 5, opneingtime: "10:30 AM", closingtime: "06:30 PM", islemSüresi: "8 hours", chairName: "Chair 5", employee:{employeeName: "Employee 5"},admin:{ adminName: "Admin 5", storeName: "Store 5", chairCount: 10 }},
    { chairid: 6, opneingtime: "08:30 AM", closingtime: "04:30 PM", islemSüresi: "8 hours", chairName: "Chair 6", employee:{employeeName: "Employee 6"},admin:{ adminName: "Admin 6", storeName: "Store 6", chairCount: 18 }},
    { chairid: 7, opneingtime: "09:15 AM", closingtime: "05:15 PM", islemSüresi: "8 hours", chairName: "Chair 7", employee:{employeeName: "Employee 7"},admin:{ adminName: "Admin 7", storeName: "Store 7", chairCount: 22 }}
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70 ">
        {/* Sola yaslı başlık */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
          Chair List
        </h1>

        {/* Map dışında ekstra bir div örneği */}
        <div className="mb-4 p-4 bg-white rounded-xl shadow">
          <p className="text-gray-600 text-sm">Toplam sandelye sayısı: <strong>{chair.length}</strong></p>
        </div>

        {/* Grid yapısı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {chair.map(chair => (
            <Link to="/chairDetails" key={chair.chairid}>
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faChair} className="text-blue-500 text-xl" />
                  <span className="font-medium text-gray-700">{chair.chairName}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default ChairList;
