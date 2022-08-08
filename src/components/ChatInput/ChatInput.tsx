import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
//@ts-ignore
import smile from "assets/img/smile.png";
//@ts-ignore
import send from "assets/img/send.png";
import useEventListener from "hooks/useEventListener";

type Props = {
  sendMessage: (message: string) => Promise<void>;
};

const ChatInput: FC<Props> = ({ sendMessage }) => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>();
  const refEmoji = useRef<HTMLImageElement | null>();

  const handleEmoji = () => {
    setShowEmoji((prev) => !prev);
  };
  const handleEmojiClick = (e, emoji) =>
    setMsg((prev) => `${prev}${emoji.emoji}`);

  const handleSend = (e) => {
    e.preventDefault();
    if (msg.length > 0) sendMessage(msg);
    setMsg("");
  };

  const handleClickOutside = (event) => {
    const element = event?.target as HTMLElement;
    if (element === refEmoji.current) return;
    if (ref.current && !ref.current.contains(element)) setShowEmoji(false);
  };

  useEventListener("mousedown", handleClickOutside);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji" onClick={handleEmoji}>
          {/*//@ts-ignore*/}
          <img src={smile} alt="smile" ref={refEmoji} />
        </div>
      </div>
      <form className={"input-container"} onSubmit={(e) => handleSend(e)}>
        <input
          type="text"
          placeholder={"Type your message here"}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className={"submit"}
          onClick={(e) => {
            e.preventDefault();
            handleSend(e);
          }}
        >
          <img src={send} alt="send" />
        </button>
      </form>
      {showEmoji && (
        //@ts-ignore
        <div ref={ref} className={"emoji-wrapper"}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      width: 30px;
      height: 30px;
      cursor: pointer;
      transition: filter 5s ease-in-out;
      &:hover {
        filter: invert(8%) sepia(80%) saturate(7077%) hue-rotate(256deg)
          brightness(130%) contrast(125%);
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: invert(58%) sepia(74%) saturate(2699%) hue-rotate(213deg)
          brightness(100%) contrast(91%);
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    background-color: #ffffff34;
    padding-right: 10px;

    input {
      width: 100%;
      padding: 10px 10px;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 16px;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;

      img {
        width: 20px;
      }
    }
  }
  .emoji-wrapper {
    position: absolute;
    left: 0;
    bottom: 60px;
    .emoji-picker-react {
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9186f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9186f3;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9186f3;
      }
      .emoji-group:before {
        background-color: #080420;
      }
    }
  }
`;

export default ChatInput;
