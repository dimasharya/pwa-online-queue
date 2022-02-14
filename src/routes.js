import React, { lazy } from "react";

const TicketOrder = lazy(() => import("./pages/user/TicketOrder"));
const Profile = lazy(() => import("./pages/user/Profile"));
const MyTicket = lazy(() => import("./pages/user/MyTicket"));
const MyTicketHistory = lazy(() => import("./pages/user/MyTicketHistory"));

const routes = [
  {
    path: "ticketorder",
    element: <TicketOrder />,
  },
  {
    path: "account",
    element: <Profile />,
  },
  {
    path: "queue",
    element: <MyTicket />,
  },
  {
    path:"queuehistory",
    element:<MyTicketHistory />
  }
];

export default routes;
