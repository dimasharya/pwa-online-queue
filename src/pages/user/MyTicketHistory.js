import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getExpiredAntrian } from "../../api/Antrian";
import TicketCard from "../../components/TicketCard";
import TicketNotFound from "../../components/TicketNotFound";

export default function MyTicketHistory() {
  const [ticket, setTicket] = useState();

  const { user } = useAuth0()

  useEffect(() => {
    let mounted = true;
    getExpiredAntrian(user.email).then((res) => {
      if(mounted){
          setTicket(res)
      }
    })
    return () => (mounted = false);
  }, [])


  return (
    <>
      {ticket ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-4 mt-10 mx-5 gap-4">
          {ticket.map((item, index) => {
            let idx = `ticket${index}`;
            return <TicketCard mode="selesai" key={idx} dataTenant={item} />;
          })}
        </div>
      ) : (
        <TicketNotFound />
      )}
    </>
  );
}
