import React, { lazy } from "react";
import Navigation from "../components/Navigation";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const TicketOrder = lazy(() => import("../pages/user/TicketOrder"));
const Profile = lazy(() => import("../pages/user/Profile"));
const MyTicket = lazy(() => import("../pages/user/MyTicket"));
const MyTicketHistory = lazy(() => import("../pages/user/MyTicketHistory"));
const SuccessOrder = lazy(() => import("../pages/user/SuccessOrder"));

const TheLayout = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="h-screen bg-gray-200">
      {isAuthenticated ? <Navigation /> : ""}
      <Main>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="ticketorder">
            <Route path=":tenantId" element={<TicketOrder />} />
          </Route>
          <Route path="queue" element={<MyTicket />} />
          <Route path="queuehistory" element={<MyTicketHistory />} />
          <Route path="account" element={<Profile />} />
          <Route path="successorder">
            <Route path=":ticketId" element={<SuccessOrder />} />
          </Route>
        </Routes>
      </Main>
    </div>
  );
};
// export default withAuthenticationRequired(TheLayout, {
//   onRedirecting: () => <TheSuspense />,
// });

export default TheLayout;
