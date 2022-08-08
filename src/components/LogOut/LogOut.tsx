import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components/Button";
import { useAuthContainer } from "context/authContext";
import { removeLocalItem } from "utils";
import { Pages } from "config";

const LogOut = () => {
  const { setUser } = useAuthContainer();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    //@ts-ignore
    setUser({});
    removeLocalItem("token");
    navigate(`/${Pages.LOGIN}`);
  };
  return (
    <Button
      text={"Log Out"}
      onClick={handleLogOut}
      styles={{ padding: "0.5rem", fontSize: "0.6rem" }}
    />
  );
};

export default LogOut;
