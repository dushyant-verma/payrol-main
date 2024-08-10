import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppContainer from "../Appcontainer";
import store from "../../store";
import { Provider } from "react-redux";
import Login from "../../views/pages/Authentication/Login";

import ChangePassword from "../../views/pages/Authentication/ChangePassword";

import { Navigate } from "react-router-dom/dist";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  useEffect(() => {
    // localStorage.setItem("email", "admin@dreamstechnologies.com");
    // localStorage.setItem("password", "123456");
  }, []);
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />

            <Route path="/*" element={<AppContainer />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default AppRouter;
