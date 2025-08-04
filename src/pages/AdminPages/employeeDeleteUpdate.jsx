import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteData, postData, putData } from '../../apiService';
import AdminLayout from './AdminLayout';

function EmployeeDeleteUpdate() {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [chairId, setChairId] = useState('');
  const token = localStorage.getItem('token');
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const handleEdit = (employee) => {
    setEditMode(true);
    setEditEmployeeId(employee.id);
    setEmployeeName(employee.employeeName);
    setChairId(employee.chairId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeName || !chairId) return alert("Lütfen tüm alanları doldurun.");

    try {
      if (editMode) {
        await putData(`/admin/employee/update/${editEmployeeId}`, {
          employeeName,
          chairId
        });

        const updatedList = await axios.get('http://localhost:8080/admin/employee/list', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployeeList(updatedList.data);

        alert("Çalışan başarıyla güncellendi.");
      } else {
        const res = await postData("/admin/employee/employeeAdd", {
          employeeName,
          chairId
        });
        setEmployeeList(prevList => [...prevList, res.data]);  // res.data olacak
        alert("Çalışan başarıyla eklendi!");
      }

      setEmployeeName('');
      setChairId('');
      setEditMode(false);
      setEditEmployeeId(null);
    } catch (err) {
      alert("İşlem hatası: " + (err.response?.data || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu çalışanı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteData(`/admin/employee/delete/${id}`);
        setEmployeeList(employeeList.filter(employee => employee.id !== id));
        alert("Çalışan başarıyla silindi.");
      } catch (err) {
        console.error("Çalışan silinirken hata oluştu:", err);
        alert("Silme işlemi sırasında hata oluştu: " + (err.response?.data || err.message));
      }
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8080/admin/employee/list', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setEmployeeList(res.data);
      })
      .catch(err => {
        console.error("Çalışanlar çekilirken hata oluştu:", err);
      });
  }, [token]);

  return (
    <AdminLayout>
      <div className="flex gap-6">
        {/* Sol: Liste */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
          {employeeList.map((employee) => (
            <div
              key={employee.id}
              className="bg-white p-4 mb-4 border border-gray-300 rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Employee ID:</strong> {employee.id}</p>
                <p><strong>Employee Name:</strong> {employee.employeeName}</p>
                <p><strong>Chair ID:</strong> {employee.chairId}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full transition"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sağ: Form */}
        <div className="w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? "Edit Employee" : "Create Employee"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Employee Name</label>
              <input
                type="text"
                onChange={(e) => setEmployeeName(e.target.value)}
                value={employeeName}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter employee name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Chair ID</label>
              <input
                type="number"
                onChange={(e) => setChairId(e.target.value)}
                value={chairId}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter chair ID"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {editMode ? "Update Employee" : "Create Employee"}
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
                  className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition duration-200"
                >
                  Cancel
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
