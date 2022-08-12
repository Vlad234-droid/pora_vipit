import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ChatInput from "components/ChatInput";
import Messages from "components/Messages";
import { Axios } from "api";
import { sendMessageRouter } from "utils/ApiRoutes";
import { useAuthContainer } from "context/authContext";
import { devices } from "utils";

type Props = {
  chat: {
    avatarImage: string;
    email: string;
    username: string;
    _id: string;
  };
  socket: any;
};

type Message = {
  fromSelf: boolean;
  message: string;
};

const ChatContainer: FC<Props> = ({ chat, socket }) => {
  const { user } = useAuthContainer();
  const scrollRef = useRef();
  const [messages, setMessages] = useState<Array<Message> | []>([]);
  const [arrivalMessage, setArrivalMessage] = useState<null | object>(null);

  const handleSend = async (message) => {
    await Axios(`${sendMessageRouter}`, "post", {
      //@ts-ignore
      from: user?._id,
      to: chat?._id,
      message,
    });
    socket.current.emit("send-msg", {
      //@ts-ignore
      from: user?._id,
      to: chat?._id,
      message,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    //@ts-ignore
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    //@ts-ignore
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className={"avatar"}>
            <img src={chat.avatarImage} alt={"avatarImage"} />
          </div>
          <div className="username">
            <h3>{chat.username}</h3>
          </div>
        </div>
      </div>

      <Messages
        chat={chat}
        messages={messages}
        /*// @ts-ignore*/
        setMessages={setMessages}
        scrollRef={scrollRef}
      />
      <ChatInput sendMessage={handleSend} key={chat?._id} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    right: 16px;
    bottom: 77px;
    width: 5px;
    height: 17px;
    background-color: #0a0a14;
  }
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      gap: 1rem;
      align-items: center;
      .avatar {
        img {
          height: 100px;
          width: 100px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    @media screen and (max-width: ${devices.tablet}) {
      padding: 2px 5px;
    }
  }
  @media screen and (max-width: ${devices.tablet}) {
    width: 100%;
  }
`;

export default ChatContainer;
