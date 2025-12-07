import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getData, putData } from '../../apiService';
import Modal from 'react-modal';

// Modal için root element
Modal.setAppElement('#root');

function OwnerUpdate() {
  const [admin, setAdmin] = useState({
    id: '',
    adminName: '',
    password: '',
    storeName: '',
    phoneNumber: '',
    referenceId: ''
  });

  const [backendLoadedReferenceId, setBackendLoadedReferenceId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const data = await getData('/admin/myAdmin');

        setAdmin({
          id: data.id || '',
          adminName: data.adminName || '',
          password: '',
          storeName: data.storeName || '',
          phoneNumber: data.phoneNumber || '',
          referenceId: data.referenceId || ''
        });

        setBackendLoadedReferenceId(data.referenceId || "");

        // Eğer referenceId boşsa modal aç
        if (!data.referenceId) setShowModal(true);

      } catch (error) {
        console.error('Admin verisi çekilemedi:', error);
      }
    }
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...admin };
      if (!payload.password) delete payload.password;

      await putData('/admin/update', payload);
      alert('Bilgiler başarıyla güncellendi.');

      const data = await getData('/admin/myAdmin');

      setAdmin({
        id: data.id || '',
        adminName: data.adminName || '',
        password: '',
        storeName: data.storeName || '',
        phoneNumber: data.phoneNumber || '',
        referenceId: data.referenceId || ''
      });

      setBackendLoadedReferenceId(data.referenceId || "");

    } catch (error) {
      console.error('Güncelleme hatası:', error);
      alert('Güncelleme sırasında hata oluştu.');
    }
  };

  return (
    <AdminLayout>
      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Reference ID Uyarısı"
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Hoşgeldiniz!</h2>
        <p className="mb-4">
          Sistemimize ilk girişinizde Reference ID'niz bulunmamaktadır. 
          Bu ID sayesinde müşterileriniz sizi bulacak. Lütfen bir kere mahsus Reference ID giriniz 
          ve işleminizi tamamladıktan sonra formun altındaki mavi butona tıklayınız.
        </p>
        <button 
          onClick={() => setShowModal(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tamam
        </button>
      </Modal>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded shadow mt-4">
        <h2 className="text-3xl font-bold text-center">Admin Revision</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label>Admin Name</label>
            <input
              type="text"
              name="adminName"
              value={admin.adminName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={admin.password}
              onChange={handleChange}
              placeholder="Boş bırakırsanız değişmez"
              className="w-full mt-1 px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label>Store Name</label>
            <input
              type="text"
              name="storeName"
              value={admin.storeName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={admin.phoneNumber}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label>Reference ID</label>
            <input
              type="text"
              name="referenceId"
              value={admin.referenceId}
              onChange={handleChange}
              readOnly={backendLoadedReferenceId !== ""} 
              className={`w-full mt-1 px-4 py-2 border rounded ${
                backendLoadedReferenceId !== "" ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              placeholder={
                backendLoadedReferenceId === "" 
                  ? "Referans ID girin (bir kere girilebilir)" 
                  : ""
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default OwnerUpdate;
