import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Seconnecter from "../pages/Seconnecter";
import Profile from "../pages/Profile";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Seconnecter" element={<Seconnecter />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesComponent;
