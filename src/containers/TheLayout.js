import React, { lazy, Suspense } from "react";
import Navigation from "../components/Navigation";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../routes";
import SuccessOrder from "../pages/user/SuccessOrder";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import TheSuspense from "../components/TheSuspense";
import ExternalApi from "../pages/ExternalApi";
import { Api } from "../api/Api";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))

const TheLayout = () => {
  return (
    <div className="h-screen bg-gray-200">
      <Navigation />
      <Main>
        <Routes>
          {routes.map((route, i) => {
            return route.element ? (
              <Route
                key={i}
                path={`${route.path}/*`}
                element={route.element}
              />
            ) : null;
          })}
          <Route path="" element={<Dashboard />}/>
          <Route path="ticketorder/ordersuccess" element={<SuccessOrder />} />
          <Route path="api/external" element={<ExternalApi />} />
          <Route path="api/callapi" element={<Api />} />
        </Routes>
      </Main>
    </div>
  );
}
export default withAuthenticationRequired(TheLayout, {
  onRedirecting: () => <TheSuspense />,
});
