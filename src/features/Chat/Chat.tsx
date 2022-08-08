import React, { FC, useState } from "react";
import styled from "styled-components";
import { Users } from "pages/Chat";
import Contacts from "components/Contacts";
import Welcome from "components/Welcome";
import ChatContainer from "components/ChatContainer";
import Loader from "components/Loader";
import { useAuthContainer } from "context/authContext";
import { LOAD_STATE } from "config";

type Props = {
  contacts: Users | [];
  socket: any;
};

export const Chat: FC<Props> = ({ contacts, socket }) => {
  const [chat, setChat] = useState(null);
  const { loading } = useAuthContainer();

  const handleChangeChat = (chat) => {
    setChat(chat);
  };

  // @ts-ignore
  return (
    <Container>
      <div className="container">
        {/*@ts-ignore*/}
        {loading === LOAD_STATE.LOADING ? (
          <Loader />
        ) : (
          <Contacts contacts={contacts} handleChangeChat={handleChangeChat} />
        )}
        {/*// @ts-ignore*/}
        {!chat ? <Welcome /> : <ChatContainer chat={chat} socket={socket} />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: #131324;
  .container {
    border-radius: 20px;
    height: 85vh;
    width: 85vw;
    background: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
