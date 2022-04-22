import React, { lazy, Suspense } from "react";
import Navigation from "../components/Navigation";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessOrder from "../pages/user/SuccessOrder";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TheSuspense from "../components/TheSuspense";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const TicketOrder = lazy(() => import("../pages/user/TicketOrder"));
const Profile = lazy(() => import("../pages/user/Profile"));
const MyTicket = lazy(() => import("../pages/user/MyTicket"));
const MyTicketHistory = lazy(() => import("../pages/user/MyTicketHistory"));

const TheLayout = () => {
  const {isAuthenticated} = useAuth0()
  return (
    <div className="h-screen bg-gray-200">
      {isAuthenticated ? <Navigation /> : "" }
      <Main>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="ticketorder" element={<TicketOrder />}>
            <Route path=":tenantId" element={<TicketOrder />} />
          </Route>
          <Route path="queue" element={<MyTicket />} />
          <Route path="queuehistory" element={<MyTicketHistory />} />
          <Route path="account" element={<Profile />} />
        </Routes>
      </Main>
    </div>
  );
};
// export default withAuthenticationRequired(TheLayout, {
//   onRedirecting: () => <TheSuspense />,
// });

export default TheLayout
