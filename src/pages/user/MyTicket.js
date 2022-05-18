import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getActiveAntrian, setCancelAntrian } from "../../api/Antrian";
import TicketCard from "../../components/TicketCard";
import TicketNotFound from "../../components/TicketNotFound";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyTicket() {
  const [ticket, setTicket] = useState();
  const { user } = useAuth0();
  let navigate = useNavigate()

  const fetchAntrian = () => {
    getActiveAntrian(user.email).then((res) => {
      if (res.length !== 0) {
        setTicket(res);
      }
    });
  };

  async function toggleCancelAntrian(antrianId) {
    await setCancelAntrian(antrianId).then((res) => {
      if (res === "success") {
        toast.success("Tiket anda berhasil di batalkan");
      }
    });
    await navigate("/")
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchAntrian();
    }
    return () => (mounted = false);
  }, []);

  return (
    <>
      {ticket ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-4 mt-10 mx-5 gap-4">
          {ticket.map((item, index) => {
            let idx = `ticket${index}`;
            return (
              <TicketCard
                key={idx}
                mode="aktif"
                dataTenant={item}
                toggleCancelAntrian={toggleCancelAntrian}
              />
            );
          })}
        </div>
      ) : (
        <TicketNotFound />
      )}
    </>
  );
}
