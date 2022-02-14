import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function TenantCard(params) {
  return (
    <Link to="/">
      <div className="bg-white rounded-2xl border-0 shadow-lg pb-2">
        <img
          className="rounded-t-2xl h-36 w-full object-cover"
          src="https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?cs=srgb&dl=pexels-linkedin-sales-navigator-2182979.jpg&fm=jpg"
          alt=""
        />
        <div className="py-2 px-4">
          <h5 className="-mb-1 truncate font-bold tracking-tight text-gray-800">
            Dr. Achmad Tohir
          </h5>
          <span className="text-xs text-gray-400">Dokter Umum</span>
          <div className="flex justify-between mt-2">
            <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>Dolopo</span>
            </div>

            <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
              <FontAwesomeIcon icon={faClock} />
              <span>06:00-07:00 & 18:00-21:00</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
