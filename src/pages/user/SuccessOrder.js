import React from "react";

export default function SuccessOrder(params) {
  return (
    <>
      <div className="pt-16">
        <h2 className="text-xl text-white font-semibold text-center">
          Yeay, Selamat anda telah berhasil mendapat nomor antrian!
        </h2>
      </div>
      <div className="divide">
        <div className="flex max-w-sm mt-10 mx-5 bg-white rounded-2xl border-0 p-8 items-center">
          <img
            className="w-12 h-12 object-cover rounded-full mr-3"
            src="https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?cs=srgb&dl=pexels-linkedin-sales-navigator-2182979.jpg&fm=jpg"
            alt="Bonnie"
          />
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-800">Dr. Achmad Tohir</h4>
            <span className="font-semibold text-xs text-gray-400">
              Dokter Umum
            </span>
          </div>
        </div>
        </div>
    </>
  );
}
