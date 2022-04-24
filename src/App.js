import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// const Layout = lazy(() => import('./containers/Layout'));

import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import TheSuspense from "./components/TheSuspense";
import { Toaster } from "react-hot-toast";

const TheLayout = lazy(() => import("./containers/TheLayout"));

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <TheSuspense />;
  }

  return (
    <>
      <Toaster />
      <Routes history={history}>
        <Route path="/*" element={<TheLayout />} />
        <Route path="/login" />
      </Routes>
    </>
  );
}

export default App;
