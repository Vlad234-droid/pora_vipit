import React, { FC } from "react";
import styled from "styled-components";
import { useAuthContainer } from "context/authContext";
//@ts-ignore
import Slava from "assets/img/slava.jpg";
import { devices } from "utils";

const Welcome: FC = () => {
  const { user } = useAuthContainer();

  return (
    <Container>
      <h2>
        Welcome, <span>{user.username}!</span>
      </h2>
      <h3>Please select a chat to start Messaging</h3>
      {/*<img src={Slava} alt="Slava" />*/}
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
  h3 {
    text-align: center;
    font-size: 20px;
  }
  span {
    color: #4e0eff;
  }
  @media screen and (max-width: ${devices.tablet}) {
    margin: 0 auto;
  }
`;

export default Welcome;
