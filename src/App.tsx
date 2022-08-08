import React, { FC } from "react";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "context/authContext";
import "./index.css";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
