import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// 🔗 Backend base URL (ngrok)
const BASE_URL = "https://antone-unupbraiding-stephine.ngrok-free.dev";

// 📅 Tarih formatlayıcı
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");

  // 🟢 ADMIN LİSTESİNİ ÇEK
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/supervisor/adminList`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      console.log("API cevabı:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      data.sort((a, b) => a.id - b.id);
      setAdmins(data);
    } catch (error) {
      console.error("Admin listesi çekilirken hata:", error);
      setAdmins([]);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🔄 STATUS DEĞİŞTİR
  const toggleStatus = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}/supervisor/statusChange/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      fetchAdmins();
    } catch (error) {
      console.error("Status değiştirme hatası:", error);
    }
  };

  // ⏱ +30 GÜN EKLE
  const add30Minutes = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}/supervisor/increaseDate/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      fetchAdmins();
    } catch (error) {
      console.error("Tarih artırma hatası:", error);
    }
  };

  // 🔍 ARAMA FİLTRESİ
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.adminName?.toLowerCase().includes(search.toLowerCase()) ||
      admin.phoneNumber?.includes(search) ||
      admin.storeName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Listesi (Durum & Süre Yönetimi)
      </h2>

      {/* 🔍 Arama */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, phone, or store..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📋 TABLO */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              {[
                "ID",
                "İsim",
                "Telefon",
                "Başlangıç",
                "Bitiş",
                "Mağaza",
                "Durum",
                "+30 Gün",
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAdmins.map((admin, index) => (
              <tr
                key={admin.id}
                className={`transition-colors hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {admin.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {admin.adminName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {admin.phoneNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(admin.startTime)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {formatDate(admin.endTime)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {admin.storeName}
                </td>

                {/* 🔘 DURUM SWITCH */}
                <td className="px-6 py-4 text-sm">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={admin.status === true}
                      onChange={() => toggleStatus(admin.id)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6 shadow"></div>
                  </label>
                </td>

                {/* ➕30 GÜN */}
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => add30Minutes(admin.id)}
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow"
                  >
                    +30 Gün
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ ADMIN OLUŞTUR */}
      <div className="mt-6 flex justify-center">
        <Link
          to="/ownerRegister"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
        >
          Create Admin Account
        </Link>
      </div>
    </div>
  );
};

export default AdminList;
