import React, { use, useEffect } from 'react';
import Sidebar from './ownerSidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';

function ChairList() {
  const [chair, setChair] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/admin/chair/list', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setChair(res.data);
        console.log("Chairs:", res.data);
      })
      .catch(err => {
        console.error("Chairs could not be fetched:", err);
      });
  }, []);

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
            <Link to="/chairDetails" key={chair.id}>
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
