import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { useOnClickOutside } from "../utils/useOnClickOutside";
import Moment from "react-moment";
import { getTenant } from "../api/Tenant";

export default function TicketCard({ dataTenant, toggleCancelAntrian, mode }) {
  const { antrianId, data } = dataTenant;
  const {
    nama,
    nomor_antrian,
    status,
    tanggal,
    tenant_id,
    waktu_antri,
    waktu_estimasi,
  } = data;
  const [showDropdown, setShowDropdown] = useState(false);
  const [tenant, setTenant] = useState({
    nama_tenant: "",
    lokasi: "",
    jasa: "",
    hari_operasional: [],
    waktu_operasional: [],
    status: "",
    picture: "",
  });

  useEffect(() => {
    let mounted = true;
    getTenant(tenant_id).then((res) => {
      if (mounted) {
        setTenant(res);
      }
    });
    return () => (mounted = false);
  }, []);

  const menuRef = useRef();
  useOnClickOutside(menuRef, () => setShowDropdown(false));

  function cancelAntrian(){
    toggleCancelAntrian(antrianId)
  }

  return (
    <div className="flex flex-col rounded-xl py-4 px-2 bg-white relative">
      <div className="flex pl-4 pr-2 justify-end items-center">
        <div className="bg-white py-0.5 px-2 rounded-xl text-xs border bg-teal-50 border-teal-500 text-teal-500">
          {status}
        </div>
        {mode === "aktif" && (
          <button
          className="sm:inline-block text-gray-400 p-1.5  hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm"
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        )}
        {showDropdown && (
          <button
            ref={menuRef}
            className="px-6 py-2 text-red-700 bg-white absolute top-12 right-4 text-base shadow-lg rounded focus:bg-gray-50"
            onClick={cancelAntrian}
          >
            Batal
          </button>
        )}
      </div>
      <div className="px-4">
        <h5 className="-mb-1 -mt-2 text-lg truncate font-bold tracking-tight text-gray-800">
          {tenant.nama_tenant}
        </h5>
        <p className="text-xs text-gray-500">{tenant.jasa}</p>
        <div className="flex justify-between mt-1 -mx-1">
          <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{tenant.lokasi}</span>
          </div>
          <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
            <FontAwesomeIcon icon={faClock} />
            {tenant.waktu_operasional.map((item, idx) => {
              return <span key={`jam_operasional_tenant${idx}`}>{item}</span>;
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 mx-1 px-2 bg-teal-700 rounded-xl divide-y-2 divide-dotted divide-white divide-opacity-30">
        <div className="flex flex-col pt-4 pb-4 px-2">
          <div className="flex flex-col text-white pb-4 text-right">
            <p className="text-xs">Nama</p>
            <h3 className=" leading-tight text-lg font-semibold">{nama}</h3>
          </div>
          <div className="flex">
            <div className="flex flex-col text-center items-center bg-white p-2 rounded-lg w-24 text-teal-900">
              <p className="text-xs">Nomor</p>
              <h3 className="text-3xl font-bold">{nomor_antrian}</h3>
            </div>
            <div className="flex flex-col px-4 text-white">
              <div>
                <p className="text-xs">Hari</p>
                <h3 className=" leading-tight font-semibold">
                  <Moment format="LL" locale="id">
                    {tanggal}
                  </Moment>
                </h3>
              </div>
              <div>
                <p className="text-xs">Jam</p>
                <h3 className=" leading-tight font-semibold">
                  <Moment format="LT" locale="id">
                    {tanggal}
                  </Moment>
                  {" WIB"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
