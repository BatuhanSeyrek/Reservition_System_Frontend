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

  // Backend'in beklediği formata çevir (HH:mm → HH:mm:ss)
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    return timeStr.length === 5 ? timeStr + ":00" : timeStr;
  };

  const fetchChairs = async () => {
    try {
      const response = await getData('/admin/chair/chairget');
      setChairList(response.data || response);
    } catch (err) {
      console.error("Liste çekme hatası:", err);
    }
  };

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
      const chairData = {
        openingTime: formatTime(openingTime),
        closingTime: formatTime(closingTime),
        islemSuresi: formatTime(islemSuresi),
        chairName
      };

      if (editMode) {
        await putData(`/admin/chair/update/${editChairId}`, chairData);
        alert("Koltuk başarıyla güncellendi.");
      } else {
        await postData("/admin/chair/chairAdd", chairData);
        alert("Koltuk başarıyla eklendi.");
      }

      await fetchChairs();

      setOpeningTime('');
      setClosingTime('');
      setIslemSuresi('');
      setChairName('');
      setEditMode(false);
      setEditChairId(null);
    } catch (err) {
      console.error("İşlem hatası:", err);
      alert("İşlem sırasında hata oluştu.");
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
        alert("Silme sırasında hata oluştu.");
      }
    }
  };

  useEffect(() => {
    fetchChairs();
  }, [token]);

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* SOL: LİSTE */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Koltuk Bilgileri</h2>

          {chairList && chairList.length > 0 ? (
            chairList.map((chair) => (
              <div
                key={chair.id}
                className="bg-white p-4 mb-4 border-2 border-gray-200 rounded shadow flex"
              >
                <div className="w-3/4">
                  <p><strong>Koltuk Adı:</strong> {chair.chairName}</p>
                  <p><strong>Açılış Saati:</strong> {chair.openingTime}</p>
                  <p><strong>Kapanış Saati:</strong> {chair.closingTime}</p>
                  <p><strong>İşlem Süresi:</strong> {chair.islemSuresi}</p>
                </div>

                <div className="w-1/4 flex flex-col justify-center items-end gap-2 text-xl">
                  <button
                    onClick={() => handleEdit(chair)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(chair.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full font-size-sm"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Koltuk bulunamadı.</p>
          )}
        </div>

        {/* SAĞ: FORM */}
        <div className="w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? "Koltuk Düzenle" : "Koltuk Ekle"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Koltuk Adı
              </label>
              <input
                type="text"
                value={chairName}
                onChange={(e) => setChairName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Açılış Saati
              </label>
              <input
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Kapanış Saati
              </label>
              <input
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                İşlem Süresi
              </label>
              <input
                type="time"
                value={islemSuresi}
                onChange={(e) => setIslemSuresi(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editMode ? "Güncelle" : "Ekle"}
              </button>

              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditChairId(null);
                    setOpeningTime('');
                    setClosingTime('');
                    setIslemSuresi('');
                    setChairName('');
                  }}
                  className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  İptal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ChairDeleteUpdate;
