import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout'; 
import { getData } from '../../apiService';

function AdminInformation() {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getData('/store/storeAll');
        setStoreData(data);
      } catch (error) {
        console.error("Failed to fetch store information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">Admin & Store Information</h2>

        {storeData.length === 0 && <p>No store found.</p>}

        {storeData.map((item) => {
          const { admin, store, chairs, employees } = item;

          return (
            <div
              key={store?.id || admin?.id}
              className="bg-white p-6 mb-6 rounded shadow-md border border-gray-300"
            >
              <h3 className="text-xl font-bold mb-4">{store?.storeName || 'Unknown Store'}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admin Information */}
                <div>
                  <h4 className="font-semibold mb-2">Admin Information</h4>
                  <p><strong>Admin Name:</strong> {admin?.adminName || 'Unknown'}</p>
                </div>

                {/* Store Information */}
                <div>
                  <h4 className="font-semibold mb-2">Store Information</h4>
                  <p><strong>Number of Chairs:</strong> {chairs?.length || 0}</p>
                </div>
              </div>

              {/* Chairs Details */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Chairs</h4>
                {chairs && chairs.length > 0 ? (
                  <ul className="list-disc list-inside max-h-48 overflow-y-auto border p-2 rounded bg-gray-50">
                    {chairs.map((chair) => (
                      <li key={chair.id}>
                        <strong>{chair.chairName}</strong> | Opening: {chair.openingTime} - Closing: {chair.closingTime} | Processing Time: {chair.islemSuresi}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No chairs available.</p>
                )}
              </div>

              {/* Employees Details */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Employees</h4>
                {employees && employees.length > 0 ? (
                  <ul className="list-disc list-inside max-h-48 overflow-y-auto border p-2 rounded bg-gray-50">
                    {employees.map((emp) => (
                      <li key={emp.id}>{emp.employeeName}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No employees found.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}

export default AdminInformation;
