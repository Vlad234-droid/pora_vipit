import React, { FC, useState } from "react";
import { Users } from "pages/Chat";
import { useAuthContainer } from "context/authContext";
import styled from "styled-components";
import LogOut from "components/LogOut";
import Burger from "components/Burger";
//@ts-ignore
import logo from "assets/img/girl.jpeg";
import { devices } from "utils";

type Props = {
  contacts: Users | [];
  handleChangeChat: (chat) => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
};

const Contacts: FC<Props> = ({
  contacts,
  handleChangeChat,
  setToggle,
  toggle,
}) => {
  const { user } = useAuthContainer();
  const [selected, setSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    if (toggle) setToggle(() => false);
    setSelected(() => index);
    handleChangeChat(contact);
  };
  return (
    <Container toggle={toggle}>
      <div className="brand">
        {/*<div className={"logo-wrapper"}>*/}
        {/*  /!*<img src={logo} alt={"image"} />*!/*/}
        {/*</div>*/}
        <Burger onClick={() => setToggle((prev) => !prev)} toggle={toggle} />

        <h3>Pora vipit</h3>
      </div>
      <div className="contacts">
        {contacts?.map((contact, index) => (
          <div
            onClick={() => changeCurrentChat(index, contact)}
            key={index}
            className={`contact ${index === selected ? "selected" : ""}`}
          >
            <div className="avatar">
              <img src={contact.avatarImage} alt={"avatarImage"} />
            </div>
            <div className={"username"}>
              <h2>{contact.username}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className={"current-user"}>
        <div className="info">
          <div className={"avatar"}>
            <img src={user.avatarImage} alt={"avatarImage"} />
          </div>
          <div className={"username"}>
            <h2>{user.username}</h2>
          </div>
        </div>
        <LogOut />
      </div>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 20px;
  display: grid;
  grid-template-rows: 10% 65% 25%;
  overflow: hidden;
  background: #080420;
  transition: width 0.5s ease;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
    .burger {
      display: none;
    }

    .logo-wrapper {
      margin-top: auto;
      height: 200px;
      border-radius: 50%;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    h3 {
      font-size: 18px;
      color: white;
      text-transform: uppercase;
      @media screen and (max-width: ${devices.tablet}) {
        // display: ${({ toggle }) => (toggle ? "none" : "block")};
        display: none;
      }
    }

    @media screen and (max-width: ${devices.tablet}) {
      .burger {
        display: block;
      }
    }
    @media screen and (max-width: ${devices.tablet}) {
      flex-direction: column;
    }
  }
  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    min-width: 86px;

    &::-webkit-scrollbar {
      background-color: #080420;
      width: 5px;
      &-thumb {
        background-color: #9186f3;
        border-radius: 4px;
      }
    }
    .contact.selected {
      background: #9186f3;
    }
    .contact {
      min-height: 110px;
      overflow: hidden;
      background: #ffffff39;
      border-radius: 10px;
      width: 90%;
      cursor: pointer;
      padding: 4px;
      gap: 4px;
      align-items: center;
      display: flex;
      justify-content: space-around;
      transition: 0.2s ease-in-out;

      .username {
        word-break: break-all;
      }
      .avatar {
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          min-width: 70px;
        }
      }
      @media screen and (max-width: ${devices.mobile}) {
        flex-direction: column;
      }
    }
    @media screen and (max-width: ${devices.tablet}) {
      .username {
        display: ${({ toggle }) => (toggle ? "block" : "none")};
      }
    }
  }
  .current-user {
    background: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 35px;
    .info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 10px;
      .avatar {
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .username {
        color: white;
        @media screen and (max-width: ${devices.tablet}) {
          display: none;
        }
      }
    }

    // @media screen and (max-width: ${devices.tablet}) {
    //   flex-direction: column;
    // }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .current-user .username {
      h2 {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (max-width: ${devices.tablet}) {
    width: ${({ toggle }) => (toggle ? "40vw" : "20%")};
    min-width: 100px;
  }
  @media screen and (max-width: ${devices.mobile}) {
    width: ${({ toggle }) => (toggle ? "100%" : "10%")};
    min-width: 110px;
  }
`;

export default Contacts;
