import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { postData } from "../../apiService";

function ReferenceIdLogin() {
  const [referenceId, setReferenceId] = useState("");
  const navigate = useNavigate();

  const handleReferenceLogin = async (e) => {
    e.preventDefault();

    try {
      const body = { referenceId };

      const response = await postData("/user/refenceIdLogin", body);

      if (response.status === 200) {
        localStorage.setItem("referenceId", response.referenceId);
        localStorage.setItem("adminName", response.adminName);
        localStorage.setItem("adminId", response.id);
        localStorage.setItem("storeName", response.storeName);


        navigate("/referencereservation");
      } else {
        alert("Hatalı referenceId!");
      }

    } catch (err) {
      console.error(err);
      alert("Reference ID hatalı veya bulunamadı.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20230616/original/pngtree-barbershop-with-several-old-and-antique-chairs-picture-image_3629466.jpg')",
        }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg space-y-6">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Reference ID Girişi
        </h2>

        <form onSubmit={handleReferenceLogin} className="space-y-4">
          <div>
            <label
              htmlFor="referenceId"
              className="block text-sm font-semibold text-gray-700"
            >
              Reference ID
            </label>
            <input
              type="text"
              id="referenceId"
              required
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 font-semibold"
          >
            Giriş Yap
          </button>
        </form>

        {/* 📌 Buraya kullanıcı login yönlendirmesi eklendi */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-700">
            Kullanıcı olarak giriş yapmak istiyor musun?
          </p>

          <button
            onClick={() => navigate("/userLogin")}
            className="mt-2 w-full py-2 rounded-md bg-gray-800 text-white hover:bg-black transition font-semibold"
          >
            Kullanıcı Girişi Yap
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReferenceIdLogin;
