import React, { FC, useEffect } from "react";
import LoginForm from "features/LoginForm";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastProps } from "utils";

const Login: FC = () => {
  const { state } = useLocation();

  useEffect(() => {
    if ((state as any)?.register) {
      toast.success(
        "Your account has been successfully registered",
        toastProps as any
      );
    }
  }, []);
  return <LoginForm />;
};

export default Login;
