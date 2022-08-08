import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "components/Loader";
import { Axios } from "api";
import { v4 as uuidv4 } from "uuid";
import { getAllMessagesRoute } from "utils/ApiRoutes";
import { useAuthContainer } from "context/authContext";
import { LOAD_STATE } from "config";

type Props = {
  chat: {
    avatarImage: string;
    email: string;
    username: string;
    _id: string;
  };
  setMessages: () => void;
  messages: Array<Message>;
  scrollRef?: any;
};

type Message = {
  fromSelf: boolean;
  message: string;
  avatar?: string;
};

const Messages: FC<Props> = ({ chat, setMessages, messages, scrollRef }) => {
  const { user } = useAuthContainer();
  const [loading, setLoading] = useState<LOAD_STATE | "">("");

  const prepareData = () => {
    if (!messages.length) return;
    let checker;
    let isSelf;

    return messages.map((item, i, arr) => {
      if (i === 0) {
        isSelf = item?.fromSelf;
        checker = i;
        return item;
      }
      if (i + 1 === arr.length && item.fromSelf === messages[i - 1].fromSelf) {
        arr[checker].avatar = !!isSelf ? user.avatarImage : chat.avatarImage;
        return item;
      } else if (
        i + 1 === arr.length &&
        item.fromSelf !== messages[i - 1].fromSelf
      ) {
        arr[checker].avatar = !!isSelf ? user.avatarImage : chat.avatarImage;
        isSelf = item?.fromSelf;
        arr[i].avatar = !!isSelf ? user.avatarImage : chat.avatarImage;
        return item;
      } else {
        if (isSelf === item?.fromSelf) return item;
        arr[checker].avatar = !!isSelf ? user.avatarImage : chat.avatarImage;
        isSelf = item?.fromSelf;
        checker = i;
        return item;
      }
    });
  };

  useEffect(() => {
    const getMessages = async () => {
      setLoading(LOAD_STATE.LOADING);
      const res = await Axios(`${getAllMessagesRoute}`, "post", {
        //@ts-ignore
        from: user?._id,
        to: chat?._id,
      });
      setLoading("");

      // @ts-ignore
      setMessages(res?.data);
    };
    getMessages();
  }, [chat._id]);

  return (
    <Container>
      {loading === LOAD_STATE.LOADING ? (
        <Loader />
      ) : (
        !!messages?.length &&
        //@ts-ignore
        prepareData().map((message) => (
          <div className={"chat-message"} key={uuidv4()} ref={scrollRef}>
            {message.avatar && (
              <div className={"avatar-wrapper"}>
                <img src={message.avatar} alt="avatar" />
              </div>
            )}
            <div
              //@ts-ignore
              className={`message ${message?.fromSelf ? "sender" : "received"}`}
            >
              <div className="content">
                {/*//@ts-ignore*/}
                {message.message}
              </div>
            </div>
          </div>
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 80%;
  overflow: scroll;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 5px;
    &-thumb {
      background-color: #9186f3;
      border-radius: 2px;
    }
  }

  .chat-message {
    padding: 0.6rem 0.5rem;
    width: fit-content;
    max-width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .avatar-wrapper {
      width: 30px;
      height: 30px;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .message {
      .content {
        overflow-wrap: break-word;
        padding: 0.7rem;
        font-size: 1.1rem;
        color: #d1d1d1;
        border-radius: 15px;
      }
    }
    .sender {
      .content {
        background-color: #002d6d;
      }
    }
    .received {
      .content {
        background-color: #2300b0;
      }
    }
  }
`;

export default Messages;
