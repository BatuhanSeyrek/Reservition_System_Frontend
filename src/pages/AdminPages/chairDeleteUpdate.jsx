import React, { useEffect, useState } from 'react';
import Sidebar from './ownerSidebar';
import axios from 'axios';

function ChairDeleteUpdate() {
  const [chair, setChair] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/admin/chair/list', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setChair(res.data);
      console.log("Chairs:", res.data);
    })
    .catch(err => {
      console.error("Chairs could not be fetched:", err);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bu sandalyeyi silmek istediğinizden emin misiniz?")) {
      axios.delete(`http://localhost:8080/admin/chair/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("Chair deleted:", res.data);
        setChair(chair.filter(c => c.id !== id));
      })
      .catch(err => {
        console.error("Chair could not be deleted:", err);
      });
    }
  };
 const [formData, setFormData] = useState({
    chairName: '',
    openingTime: '',
    closingTime: '',
    islemSuresi: ''
  });



  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/admin/chair/chairAdd", formData, {
        headers: { Authorization: `Bearer ${token}` } 
      })
      .alert("Kayıt başarılı!");
    } catch (err) {
      alert("Hata: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <div className="flex gap-6">
          {/* Chair List */}
          <div className="w-2/4">
            <h2 className="text-xl font-semibold mb-4">Chair Information</h2>
            {chair.map(c => (
              <div key={c.id} className="bg-white p-4 mb-4 border-2 rounded shadow flex">
                <div className="w-3/4">
                  <p><strong>Chair ID:</strong> {c.id}</p>
                  <p><strong>Opening Time:</strong> {c.openingTime}</p>
                  <p><strong>Closing Time:</strong> {c.closingTime}</p>
                  <p><strong>Processing Time:</strong> {c.islemSuresi}</p>
                  <p><strong>Chair Name:</strong> {c.chairName}</p>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-end gap-2 text-xl">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition"
                    onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chair Create Form */}
          <div className="w-2/4 p-1 bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Chair Create</h2>
            <div className="bg-white p-4 rounded shadow">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Chair Name</label>
                  <input type="text" name="chairName" required onChange={handleChange} value={formData.chairName}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Opening Time</label>
                  <input type="time" name="openingTime" required onChange={handleChange} value={formData.openingTime}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Closing Time</label>
                  <input type="time" name="closingTime" required onChange={handleChange} value={formData.closingTime}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Processing Time</label>
                  <input type="time" name="islemSuresi" required  onChange={handleChange} value={formData.islemSuresi}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <button type="submit"
                      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                      Create Chair
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button type="button" disabled
                      className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg">
                      Update Chair
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChairDeleteUpdate;
