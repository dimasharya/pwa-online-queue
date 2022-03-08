import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function TenantCard({ dataTenant }) {
  const { tenantId, data } = dataTenant;
  const {
    nama_tenant,
    lokasi,
    jasa,
    hari_operasional,
    waktu_operasional,
    status,
    picture,
  } = data;

  // function link () {
  //   let link;
  //   isAuthenticated ? link = `ticketorder/${tenantId}` : link = `app/ticketorder/${tenantId}`
  //   return link
  // }

  const link = `ticketorder/${tenantId}`

  return (
    <Link to={link}>
      <div className="bg-white rounded-2xl border-0 shadow-lg pb-2">
        <img
          className="rounded-t-2xl h-36 w-full object-cover"
          src={picture}
          alt=""
        />
        <div className="py-2 px-4">
          <h5 className="-mb-1 truncate font-bold tracking-tight text-gray-800">
            {nama_tenant}
          </h5>
          <span className="text-xs text-gray-400">{jasa}</span>
          <div className="flex justify-between mt-2">
            <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{lokasi}</span>
            </div>

            <div className="flex items-center bg-teal-50 py-1 px-3 rounded-xl text-xs text-teal-500 gap-2">
              <FontAwesomeIcon icon={faClock} />
              {waktu_operasional.map((item, idx) => {
                return <span key={`jam_operasional_tenant${idx}`}>{item}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
