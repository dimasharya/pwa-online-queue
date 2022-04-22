import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle, faHistory, faTicketAlt } from "@fortawesome/free-solid-svg-icons";

export default function Navigation(params) {
  const NavActive = "w-full text-teal-600 hover:text-teal-600 justify-center inline-block text-center pt-2 pb-1";
  const Nav = "w-full focus:text-teal-600 hover:text-teal-600 justify-center inline-block text-center pt-2 pb-1";
  return (
    <>
      <nav
        id="bottom-navigation"
        className="block fixed inset-x-0 bottom-0 z-10 py-1 bg-white shadow"
      >
        <div id="tabs" className="flex justify-between text-gray-400">
          <NavLink
            to="/"
            className={(navData) => navData.isActive ? NavActive : Nav}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="tab tab-home block text-xs">Beranda</span>
          </NavLink>
          <NavLink
            to="/queue"
            className={(navData) => navData.isActive ? NavActive : Nav}
          >
            <FontAwesomeIcon icon={faTicketAlt} size="lg" />
            <span className="tab tab-kategori block text-xs">Antrian Saya</span>
          </NavLink>
          <NavLink
            to="/queuehistory"
            className={(navData) => navData.isActive ? NavActive : Nav}
          >
            <FontAwesomeIcon icon={faHistory} size="lg" />
            <span className="tab tab-whishlist block text-xs">Riwayat</span>
          </NavLink>
          <NavLink
            to="/account"
            className={(navData) => navData.isActive ? NavActive : Nav}
          >
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
            <span className="tab tab-account block text-xs">Akun</span>
          </NavLink>
          <Outlet />
        </div>
      </nav>
      <Outlet />
    </>
  );
}
