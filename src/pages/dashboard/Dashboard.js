import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import TenantCard from "../../components/TenantCard";
import { getAllTenant, getTenant } from "../../api/Tenant";
import Navigation from "../../components/Navigation";
import { Navigate } from "react-router";

import Logo from "../../assets/svg/logo.svg"

export default function Dashboard(params) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [tenant, setTenant] = useState([])

  useEffect(() => {
    let mounted = true
    getAllTenant()
    .then(item => {
      if(mounted) {
        setTenant(item)
      }
    })
    return () => mounted = false
  },[])

  return (
    <div className="bg-gray-200">
      <div className="flex flex-col bg-teal-500 pb-4 rounded-b-xl top-0 w-full fixed">
        <div className="h-16 mb-2 relative">
          <div className="flex justify-center w-full py-3">
          <img src={Logo} alt="logo-img" />
          </div>
          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => loginWithRedirect()}
              className="absolute right-4 top-3 text-white ring-2 ring-teal-300 hover:bg-teal-800 focus:ring-2 focus:ring-teal-400 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center"
            >
              Masuk
            </button>
          )}
        </div>
        <form className="flex px-4 justify-between gap-4 items-center">
          <input
            type="text"
            placeholder="Cari dokter anda disini ..."
            className=" grow px-3 py-2 text-gray-600 text-sm rounded-lg border border-teal-300 sm:text-xs focus:border-opacity-0 focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="button"
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-2 focus:ring-teal-400 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="px-4 pt-32 pb-4">
        <h4 className="my-2 ml-2 text-lg font-semibold">Dokter</h4>
          <div className="grid m-2 flex-col gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {tenant.length !== 0 ? (
              tenant.map((item, idx) => {
                return <TenantCard key={`tenant${idx}`} dataTenant={item} />
              })
            ) : ""}
          </div>
      </div>
    </div>
  );
}
