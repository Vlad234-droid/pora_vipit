import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Pages } from "config";
import { Button } from "components/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <p>Page Not Found</p>
      <Button text={"Go to Home page"} onClick={() => navigate(Pages.BASE)} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-color: #131324;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  p {
    color: white;
    font-size: 22px;
  }
`;

export default NotFound;
