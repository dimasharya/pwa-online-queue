import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Moment from "react-moment";

export default function AmbilAntrianCard({
  dataTenant,
  dataAntrian,
  //onChange,
  submitAntrian,
}) {
  const { nama_tenant, lokasi, waktu_operasional } = dataTenant;
  const { nomor_sekarang, total_antrian, nomor_selesai, estimasi_antrian } =
    dataAntrian;
    const dateNow = new Date().toISOString().split('T')[0]
  const [isBuka, setIsBuka] = useState("tutup");

  useEffect(() => {
    statusBuka();
  });

  function statusBuka() {
    let waktu_buka, waktu_tutup;
    let thestatus = true
    const now = new Date();
    for (let i = 0; i < waktu_operasional.length; i++) {
      const strbuka = waktu_operasional[i].split("-");
      const strbuka2 = strbuka[0].split(":");
      waktu_buka = new Date();
      waktu_buka.setHours(strbuka2[0], strbuka2[1], "00");
      const strtutup = strbuka[1].split(":");
      waktu_tutup = new Date();
      waktu_tutup.setHours(strtutup[0], strtutup[1], "00");
      if (waktu_buka <= now && waktu_tutup > now) {
        thestatus = false;
        break;
      }
    }
    setIsBuka(thestatus);
  }

  return (
    <>
      <div className="max-w-sm mt-2 mx-5 bg-white rounded-2xl border-0">
        <img
          className="rounded-t-2xl"
          src="https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?cs=srgb&dl=pexels-linkedin-sales-navigator-2182979.jpg&fm=jpg"
          alt=""
        />
        <div className="p-5">
          <h5 className="-mb-1 text-xl truncate font-bold tracking-tight text-gray-800">
            {nama_tenant}
          </h5>
          <span className="text-xs text-gray-400">Dokter Umum</span>
          <div className="flex justify-between mt-2">
            <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{lokasi}</span>
            </div>
            <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
              <FontAwesomeIcon icon={faClock} />
              {waktu_operasional.map((item, idx) => {
                return <span key={`waktu${idx}`}>{item}</span>;
              })}
            </div>
          </div>
          <div className="mt-4">
            <form>
              <div>
                <label
                  htmlFor="small-input"
                  className="block mb-1 text-xs font-medium text-gray-400"
                >
                  Tanggal
                </label>
                <input
                  type="date"
                  id="small-input"
                  className="block px-3 py-2 w-full text-gray-600 text-sm font-semibold rounded-lg border border-gray-300 sm:text-xs focus:border-opacity-0 focus:ring-4 focus:ring-gray-300"
                  defaultValue={dateNow}
                  min={dateNow}
                  max={dateNow}
                  // onChange={(val) => onChange(val)}
                />
              </div>
            </form>
          </div>
          <div className="mt-4 flex flex-row items-center border border-gray-300 px-2 py-4 rounded-xl">
            {total_antrian !== 0 && nomor_selesai === total_antrian ? (
              <>
                <div className="basis-1/3 items-center text-center">
                  <h3 className="text-3xl text-teal-500 font-bold">
                    {nomor_selesai}
                  </h3>
                  <p className="text-xs text-gray-500 leading-none">
                    Nomor Sekarang
                  </p>
                </div>
                <p className="basis-1/3 text-center text-gray-500 text-xs">
                  Dari
                </p>
                <div className="basis-1/3 items-center text-center">
                  <h2 className="text-3xl text-teal-500 font-bold">
                    {total_antrian}
                  </h2>
                  <p className="text-xs text-gray-500 leading-none">
                    Total Pendaftar
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="basis-1/3 items-center text-center">
                  <h3 className="text-3xl text-teal-500 font-bold">
                    {nomor_sekarang}
                  </h3>
                  <p className="text-xs text-gray-500 leading-none">
                    Nomor Sekarang
                  </p>
                </div>
                <p className="basis-1/3 text-center text-gray-500 text-xs">
                  Dari
                </p>
                <div className="basis-1/3 items-center text-center">
                  <h2 className="text-3xl text-teal-500 font-bold">
                    {total_antrian}
                  </h2>
                  <p className="text-xs text-gray-500 leading-none">
                    Total Pendaftar
                  </p>
                </div>
              </>
            )}
          </div>
          {estimasi_antrian !== "" && isBuka === false ? (
            <p className="mt-4 text-gray-500 text-xs">
              Estimasi waktu anda mendapat pelayanan pada{" "}
              <Moment format="LLLL" locale="id">
                {estimasi_antrian}
              </Moment>
            </p>
          ) : (
            ""
          )}
          <button
            type="button"
            className="text-white w-full bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-3 disabled:bg-gray-500"
            onClick={() => submitAntrian()}
            disabled={isBuka}
          >
            Ambil Antrian
          </button>
        </div>
      </div>
    </>
  );
}
