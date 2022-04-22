import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// const Layout = lazy(() => import('./containers/Layout'));

import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import TheSuspense from "./components/TheSuspense";
import PrivateRoute from "./containers/PrivateRoute";

const TheLayout = lazy(() => import("./containers/TheLayout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const TicketOrder = lazy(() => import("./pages/user/TicketOrder"));

function App() {
  const { isLoading, error, loginWithRedirect } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <TheSuspense />;
  }

  return (
    <Routes history={history}>
      <Route path="/*" element={<TheLayout />} />
      {/* <Route path="/ticketorder/*" element={<TicketOrder />} /> */}
      <Route path="/login" />
    </Routes>
  );
}

export default App;
