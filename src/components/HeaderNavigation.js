import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function HeaderNavigation({ path, value }) {
    const history = useNavigate()
  return (
    <div className="w-full fixed text-white pt-7 pb-10 px-6 bg-gradient-to-b from-teal-600 to-transparent">
      <button onClick={() => history(-1)} className="active:text-gray-300">
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <span className="ml-4 font-bold">Ambil Antrian Dr. Achmad Tohir</span>
    </div>
  );
}
