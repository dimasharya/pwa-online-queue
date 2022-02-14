import notFoundImg from "../assets/svg/not-found-img.svg";

export default function TicketNotFound(params) {
    return(
        <div className="grid justify-items-center items-center h-screen">
        <div className="flex flex-col p-8 text-center">
          <img className="p-4" src={notFoundImg} alt="not-found-img" />
          <h4 className="font-semibold">Oops, Anda belum membuat antrian</h4>
        </div>
      </div>
    )
};
