import React from "react";
import styled from "styled-components";
import { useAuthContainer } from "context/authContext";
//@ts-ignore
import Slava from "assets/img/slava.jpg";

const Welcome = () => {
  const { user } = useAuthContainer();
  return (
    <Container>
      <img src={Slava} alt="Slava" />
      <h2>
        Welcome, <span>{user.username}!</span>
      </h2>
      <h3>Please select a chat to start Messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  gap: 20px;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
