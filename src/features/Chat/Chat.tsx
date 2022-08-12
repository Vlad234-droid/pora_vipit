import React, { FC, useState } from "react";
import styled from "styled-components";
import Div100vh from "react-div-100vh";
import { Users } from "pages/Chat";
import Contacts from "components/Contacts";
import Welcome from "components/Welcome";
import ChatContainer from "components/ChatContainer";
import Loader from "components/Loader";
import { LOAD_STATE } from "config";
import { devices } from "utils";

type Props = {
  contacts: Users | [];
  socket: any;
  contactsLoading: LOAD_STATE | "";
};

export const Chat: FC<Props> = ({ contacts, socket, contactsLoading }) => {
  const [chat, setChat] = useState(null);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleChangeChat = (chat) => {
    setChat(chat);
  };

  // @ts-ignore
  return (
    <Div100vh
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container toggle={toggle}>
        <div className={`container${toggle ? " toggle" : ""}`}>
          {/*@ts-ignore*/}
          {contactsLoading === LOAD_STATE.LOADING ? (
            <Loader />
          ) : (
            <Contacts
              toggle={toggle}
              setToggle={setToggle}
              contacts={contacts}
              handleChangeChat={handleChangeChat}
            />
          )}
          {!chat ? <Welcome /> : <ChatContainer chat={chat} socket={socket} />}
        </div>
      </Container>
    </Div100vh>
  );
};

const Container = styled.div`
  height: -webkit-fill-available !important;
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
    max-width: 1640px;
    background: var(--color-black);
    display: grid;
    grid-template-columns: 25% 75%;
    box-shadow: 0.1px 0.1px 3px #9a86f3;
    position: relative;
    overflow: hidden;
    &:after {
      content: "beta";
      position: absolute;
      width: 80px;
      height: 20px;
      background: var(--color-violet);
      top: 5px;
      left: -22px;
      text-align: center;
      font-size: 13px;
      text-transform: uppercase;
      font-weight: bold;
      color: white;
      line-height: 24px;
      transform: rotate(-45deg);
    }
    @media screen and (min-width: 769px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: ${devices.tablet}) {
      width: 98vw;
      display: flex;
    }
    @media screen and (max-width: ${devices.mobile}) {
      height: 100vh;
    }
  }
`;
