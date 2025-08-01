import React, { useState, useEffect } from 'react';
import Sidebar from './ownerSidebar';
import axios from 'axios';

function EmployeeDeleteUpdate() {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const[chairId,setChairId]=useState('');
  const token = localStorage.getItem('token');

  // Yeni çalışan oluşturma
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!employeeName) return alert("Lütfen tüm alanları doldurun.");

    try {
      const res = await axios.post("http://localhost:8080/admin/employee/employeeAdd", {
        employeeName,
        chairId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEmployeeList([...employeeList, res.data]);
      setEmployeeName('');
      setChairId('');
      alert("Çalışan başarıyla eklendi!");
    } catch (err) {
      alert("Ekleme hatası: " + (err.response?.data || err.message));
    }
  };

  // Çalışan silme
  const handleDelete = (id) => {
    if (window.confirm("Bu çalışanı silmek istediğinizden emin misiniz?")) {
      axios.delete(`http://localhost:8080/admin/employee/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setEmployeeList(employeeList.filter(employee => employee.id !== id));
      })
      .catch(err => {
        console.error("Çalışan silinirken hata oluştu:", err);
      });
    }
  };

  // Sayfa yüklendiğinde çalışan listesini çek
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-70">
        <div className="flex gap-6">
          {/* Sol: Liste */}
          <div className="w-2/4">
            <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
            {employeeList.map((employee) => (
              <div
                key={employee.id}
                className="bg-white p-4 mb-4 border-2 border-black-200 rounded shadow flex"
              >
                <div className="w-3/4 justify-center items-center my-auto">
                  <p><strong>Employee ID:</strong> {employee.id}</p>
                  <p><strong>Employee Name:</strong> {employee.employeeName}</p>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-end gap-2 text-xl">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full">
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

          {/* Sağ: Ekleme Formu */}
          <div className="w-2/4 p-1 bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Employee Edit and Create</h2>
            <div className="bg-white p-4 rounded shadow">
              <form className="space-y-4" onSubmit={handleCreate}>
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
                  type='number'
                  onChange={(e) => setChairId(e.target.value)}
                  value={chairId}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Enter chair ID"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      Create Employee
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

export default EmployeeDeleteUpdate;
