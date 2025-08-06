import React, { useState, useEffect } from 'react';
import { deleteData, getData, postData, putData } from '../../apiService';
import AdminLayout from './AdminLayout';

function ChairDeleteUpdate() {
  const [chairList, setChairList] = useState([]);
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [islemSuresi, setIslemSuresi] = useState('');
  const [chairName, setChairName] = useState('');
  const token = localStorage.getItem('token');
  const [editMode, setEditMode] = useState(false);
  const [editChairId, setEditChairId] = useState(null);

  const handleEdit = (chair) => {
    setEditMode(true);
    setEditChairId(chair.id);
    setOpeningTime(chair.openingTime);
    setClosingTime(chair.closingTime);
    setIslemSuresi(chair.islemSuresi);
    setChairName(chair.chairName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!openingTime || !closingTime || !islemSuresi || !chairName) {
      return alert("Lütfen tüm alanları doldurun.");
    }

    try {
      if (editMode) {
        await putData(`/admin/chair/update/${editChairId}`, {
          openingTime,
          closingTime,
          islemSuresi,
          chairName
        });

        const updatedList = await getData('/admin/chair/list');
        setChairList(updatedList.data || updatedList);
        alert("Koltuk başarıyla güncellendi.");
      } else {
        const res = await postData("admin/chair/chairAdd", {
          openingTime,
          closingTime,
          islemSuresi,
          chairName
        });
        setChairList(prevList => [...prevList, res.data]);
        alert("Koltuk başarıyla eklendi!");
      }

      // Reset
      setOpeningTime('');
      setClosingTime('');
      setIslemSuresi('');
      setChairName('');
      setEditMode(false);
      setEditChairId(null);
    } catch (err) {
      console.error("İşlem hatası:", err);
      alert("İşlem hatası: " + (err.response?.data || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu koltuğu silmek istediğinizden emin misiniz?")) {
      try {
        await deleteData(`/admin/chair/delete/${id}`);
        setChairList(chairList.filter(chair => chair.id !== id));
        alert("Koltuk başarıyla silindi.");
      } catch (err) {
        console.error("Silme hatası:", err);
        alert("Silme hatası: " + (err.response?.data || err.message));
      }
    }
  };

  useEffect(() => {
    const fetchChairs = async () => {
      try {
        const response = await getData('/admin/chair/list');
        console.log('Chair list fetched:', response);
        setChairList(response.data || response);
      } catch (err) {
        console.error("Liste çekme hatası:", err);
      }
    };
    fetchChairs();
  }, [token]);

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* Sol: Liste */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Chair Information</h2>
          {chairList && chairList.length > 0 ? (
            chairList.map((chair) => (
              <div key={chair.id} className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex">
                <div className="w-3/4">
                  <p><strong>Chair ID:</strong> {chair.id}</p>
                  <p><strong>Chair Name:</strong> {chair.chairName}</p>
                  <p><strong>Opening Time:</strong> {chair.openingTime}</p>
                  <p><strong>Closing Time:</strong> {chair.closingTime}</p>
                  <p><strong>Processing Time:</strong> {chair.islemSuresi}</p>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-end gap-2 text-xl">
                  <button onClick={() => handleEdit(chair)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(chair.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Koltuk bulunamadı.</p>
          )}
        </div>

        {/* Sağ: Form */}
        <div className="w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Chair" : "Create Chair"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Chair Name</label>
              <input type="text" value={chairName} onChange={(e) => setChairName(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Opening Time</label>
              <input type="time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Closing Time</label>
              <input type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Processing Time</label>
              <input type="time" value={islemSuresi} onChange={(e) => setIslemSuresi(e.target.value)} className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">{editMode ? "Update" : "Create"}</button>
              {editMode && (
                <button type="button" onClick={() => {
                  setEditMode(false);
                  setEditChairId(null);
                  setOpeningTime('');
                  setClosingTime('');
                  setIslemSuresi('');
                  setChairName('');
                }} className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ChairDeleteUpdate;
