import React, { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPersonCirclePlus,
  faChair,
  faUsers,
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import UserLayout from './UserLayout';
import { getData, postData } from '../../apiService';
import { motion, AnimatePresence } from 'framer-motion';

function AllStores() {
  const [storeList, setStoreList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesData, favoritesData] = await Promise.all([
          getData('/store/storeAll'),
          getData('/api/favorites/my-favorites')
        ]);
        setStoreList(storesData);
        setFavorites(favoritesData.map(f => f.id));
      } catch (err) {
        console.error('Veriler alınırken hata oluştu:', err);
      }
    };
    fetchData();
  }, []);

  const handleFavoriteToggle = async (e, storeId) => {
    e.preventDefault();
    try {
      await postData(`/api/favorites/toggle/${storeId}`);
      setFavorites(prev =>
        prev.includes(storeId)
          ? prev.filter(id => id !== storeId)
          : [...prev, storeId]
      );
    } catch (err) {
      console.error('Favori güncellenirken hata oluştu:', err);
    }
  };

  /* ⭐ FAVORİLER ÜSTE GELECEK ŞEKİLDE SIRALAMA */
  const sortedStoreList = useMemo(() => {
    return [...storeList].sort((a, b) => {
      const aFav = favorites.includes(a.store.id);
      const bFav = favorites.includes(b.store.id);
      return bFav - aFav;
    });
  }, [storeList, favorites]);

  return (
    <UserLayout>
      <div className="p-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-semibold mb-6 text-gray-800"
        >
          Mağazalar
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedStoreList.map((item, index) => {
            const { store, admin, chairs, employees } = item;
            const isFav = favorites.includes(store.id);

            return (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                {/* FAVORİ BUTONU */}
                <div className="absolute top-3 right-3 z-20">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => handleFavoriteToggle(e, store.id)}
                    className="relative p-2 focus:outline-none"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isFav ? 'fav' : 'not-fav'}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                      >
                        <FontAwesomeIcon
                          icon={isFav ? faHeartSolid : faHeartRegular}
                          className={
                            isFav
                              ? 'text-red-500 text-2xl drop-shadow'
                              : 'text-gray-400 text-2xl'
                          }
                        />
                      </motion.div>
                    </AnimatePresence>

                    {isFav && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 bg-red-400 rounded-full -z-10"
                      />
                    )}
                  </motion.button>
                </div>

                <Link to={`/reservation/${admin?.id}`} className="block h-full">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                        <FontAwesomeIcon
                          icon={faPersonCirclePlus}
                          className="text-white text-xl"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-lg font-bold text-gray-800 truncate">
                          {store.storeName}
                        </h3>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                          {admin?.adminName || 'Yönetici Atanmamış'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-500">
                        <FontAwesomeIcon icon={faChair} className="text-blue-400" />
                        <span className="text-sm font-semibold">
                          {chairs?.length || 0} Koltuk
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <FontAwesomeIcon icon={faUsers} className="text-green-400" />
                        <span className="text-sm font-semibold">
                          {employees?.length || 0} Personel
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
}

export default AllStores;
