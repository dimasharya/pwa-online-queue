import { useAuth0 } from "@auth0/auth0-react";
import React, { lazy, useEffect, useState } from "react";
import { getTenant } from "../../api/Tenant";
import AmbilAntrianCard from "../../components/AmbilAntrianCard";
import HeaderNavigation from "../../components/HeaderNavigation";
import { getConfig } from "../../config"
//const SuccessGreeting = lazy(() => import("../../components/SuccessGreeting"))

export default function TicketOrder(params) {

  const [state, setState] = useState({
    dataTenant: ""
  })

  useEffect(() => {
    let mounted = true
    getTenant()
    .then(item => {
      if(mounted) {
        setState({...state, dataTenant: item})
      }
    })
    return () => mounted = false
  },[])

  return (
    <>
      <HeaderNavigation />
        <div className="flex mt-16 mx-1">
          <AmbilAntrianCard dataTenant={state.dataTenant} />
          {/* <div className="h-20 bg-gray-300" /> */}
        </div>
    </>
  );
}
