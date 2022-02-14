import React, { useEffect, useRef, useState } from "react";
import TicketCard from "../../components/TicketCard";
import TicketNotFound from "../../components/TicketNotFound";

export default function MyTicketHistory() {
  const [ticket, setTicket] = useState();

  return (
    <>
      {ticket ? (
        <div className="grid mt-10 mx-5 gap-4">
          {ticket.map((item, index) => {
            let idx = `ticket${index}`;
            <TicketCard key={idx} />;
          })}
        </div>
      ) : (
        <TicketNotFound />
      )}
    </>
  );
}
