import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Register from "pages/Register";
import Chat from "pages/Chat";
import Login from "pages/Login";
import Avatar from "pages/Avatar";
import NotFound from "pages/NotFound";
import { Pages } from "config";

const Router = () => {
  return (
    <Routes>
      <Route path={Pages.REGISTER} element={<Register />} />
      <Route path={Pages.LOGIN} element={<Login />} />
      <Route path={Pages.AVATAR} element={<Avatar />} />
      <Route path={Pages.CHAT} element={<Chat />} />
      <Route path={Pages.BASE} element={<Navigate to={Pages.CHAT} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
