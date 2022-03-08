import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getActiveAntrian } from "../../api/Antrian";
import TicketCard from "../../components/TicketCard";
import TicketNotFound from "../../components/TicketNotFound";

export default function MyTicket() {
  const [ticket, setTicket] = useState();

  const { user } = useAuth0()

  useEffect(() => {
    let mounted = true;
    getActiveAntrian(user.email).then((res) => {
      if(mounted){
        if(res.length !== 0){
          setTicket(res)
        }
      }
    })
    return () => (mounted = false);
  }, [])


  return (
    <>
      {ticket ? (
        <div className="grid mt-10 mx-5 gap-4">
          {ticket.map((item, index) => {
            let idx = `ticket${index}`;
            return <TicketCard key={idx} data={item} />;
          })}
        </div>
      ) : (
        <TicketNotFound />
      )}
    </>
  );
}
