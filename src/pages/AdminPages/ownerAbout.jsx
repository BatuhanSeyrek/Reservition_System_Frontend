import React from 'react'
import Sidebar from './ownerSidebar'

function About() {
  return (
    <div>
       <div className="flex min-h-screen bg-gray-100">
        <Sidebar/>
        <div className="flex-1 p-6 bg-gray-100 ml-70">
           <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Hakkımızda</h1>
        <p className="text-gray-700 text-lg mb-6">
          Rezervasyon Sistemimiz, kullanıcıların kolay ve hızlı bir şekilde uygun zaman dilimlerinde rezervasyon yapmalarını sağlayan modern bir web uygulamasıdır. Kullanıcı dostu arayüzü sayesinde, yönetici ve kullanıcılar arasında sorunsuz bir iletişim köprüsü kurar.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Öne Çıkan Özellikler</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Kullanıcı ve yönetici için ayrı giriş sistemi</li>
          <li>JWT tabanlı güvenli kimlik doğrulama</li>
          <li>Rezervasyon zaman çakışmalarını önleyen algoritma</li>
          <li>30 dakika kala otomatik e-posta bildirimi</li>
          <li>Kolay yönetim paneli ile admin işlemleri</li>
          <li>Esnek zaman aralığı tanımlamaları</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Teknolojiler</h2>
        <p className="text-gray-700">
          Uygulama; <span className="font-medium">Spring Boot, React.js, PostgreSQL</span> gibi güncel teknolojiler kullanılarak geliştirilmiştir. Arayüz tasarımında <span className="font-medium">Tailwind CSS</span> tercih edilmiştir.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Amacımız</h2>
        <p className="text-gray-700">
          Hedefimiz; randevu süreçlerini dijitalleştirerek manuel işlemleri ortadan kaldırmak ve kullanıcıların zaman yönetimini en verimli şekilde yapmalarını sağlamaktır.
        </p>
      </div>
    </div>




       </div>
    </div>
    </div>
  )
}

export default About
