import React, { useState, useEffect } from 'react';
import { deleteData, getData, postData, putData } from '../../apiService';
import AdminLayout from './AdminLayout';

function EmployeeDeleteUpdate() {
  const [employeeList, setEmployeeList] = useState([]);
  const [chairList, setChairList] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [chairId, setChairId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getData('/admin/employee/employeeget');
      setEmployeeList(res.data || res);
    } catch (err) {
      console.error("Çalışan listesi çekilirken hata:", err);
    }
  };

  const fetchChairs = async () => {
    try {
      const res = await getData('/admin/chair/chairget');
      setChairList(res.data || res);
    } catch (err) {
      console.error("Koltuk listesi çekilirken hata:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchChairs();
  }, []);

  const handleEdit = (employee) => {
    setEditMode(true);
    setEditEmployeeId(employee.id);
    setEmployeeName(employee.employeeName);
    setChairId(employee.chairId ? employee.chairId.toString() : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeName || chairId === '') {
      return alert("Lütfen tüm alanları doldurun.");
    }

    try {
      const payload = { employeeName, chairId: Number(chairId) };

      if (editMode) {
        await putData(`/admin/employee/update/${editEmployeeId}`, payload);
        alert("Çalışan başarıyla güncellendi.");
      } else {
        await postData("/admin/employee/employeeAdd", payload);
        alert("Çalışan başarıyla eklendi.");
      }

      await fetchEmployees();

      setEmployeeName('');
      setChairId('');
      setEditMode(false);
      setEditEmployeeId(null);
    } catch (err) {
      console.error("İşlem hatası:", err);
      alert("İşlem sırasında hata oluştu.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu çalışanı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteData(`/admin/employee/delete/${id}`);
        setEmployeeList(employeeList.filter(employee => employee.id !== id));
        alert("Çalışan başarıyla silindi.");
      } catch (err) {
        console.error("Çalışan silinirken hata:", err);
        alert("Silme sırasında hata oluştu.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* SOL TARAF - LİSTE */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Çalışan Bilgileri</h2>

          {employeeList.length > 0 ? employeeList.map((employee) => (
            <div
              key={employee.id}
              className="bg-white p-4 mb-4 border border-gray-300 rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Çalışan Adı:</strong> {employee.employeeName}</p>
                <p>
                  <strong>Koltuk Adı:</strong>{" "}
                  {chairList.find(chair => chair.id === employee.chairId)?.chairName || 'Bilinmiyor'}
                </p>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
                  onClick={() => handleEdit(employee)}
                >
                  Düzenle
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition"
                  onClick={() => handleDelete(employee.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          )) : <p>Çalışan bulunamadı.</p>}
        </div>

        {/* SAĞ TARAF - FORM */}
        <div className="w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? "Çalışan Düzenle" : "Çalışan Ekle"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Çalışan Adı
              </label>
              <input
                type="text"
                onChange={(e) => setEmployeeName(e.target.value)}
                value={employeeName}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Çalışan adı girin"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Koltuk Seç
              </label>
              <select
                value={chairId}
                onChange={(e) => setChairId(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">-- Koltuk Seçin --</option>
                {chairList.length > 0 ? (
                  chairList.map(chair => (
                    <option key={chair.id} value={chair.id}>
                      {chair.chairName}
                    </option>
                  ))
                ) : (
                  <option disabled>Koltuklar yükleniyor</option>
                )}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
              >
                {editMode ? "Güncelle" : "Ekle"}
              </button>

              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditEmployeeId(null);
                    setEmployeeName('');
                    setChairId('');
                  }}
                  className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500"
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

export default EmployeeDeleteUpdate;
