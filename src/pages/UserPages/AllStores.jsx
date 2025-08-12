import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus, faChair, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserLayout from './UserLayout';
import { getData } from '../../apiService';

function AllStores() {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await getData('/store/storeAll');
        setStoreList(data);
      } catch (err) {
        console.error("Store bilgileri alınırken hata oluştu:", err);
      }
    };
    fetchStore();
  }, []);

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Store List with Admin Info</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {storeList.map((item) => {
            const { store, admin, chairs, employees } = item;
            return (
              <Link
                to={`/reservation/${admin?.id}`}
                key={store.id}
                className="block"
              >
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <FontAwesomeIcon icon={faPersonCirclePlus} className="text-blue-600 text-2xl" />
                    <div>
                      <h3 className="text-lg font-semibold">{store.storeName}</h3>
                      <p className="text-sm text-gray-600">Admin: <span className="font-medium">{admin?.adminName || 'Bilinmiyor'}</span></p>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between text-gray-700 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faChair} />
                      <span>{chairs?.length || 0} Chair{(chairs?.length || 0) !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUsers} />
                      <span>{employees?.length || 0} Employee{(employees?.length || 0) !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
}

export default AllStores;
