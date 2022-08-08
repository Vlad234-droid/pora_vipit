import React, { FC, useState } from "react";
import { Users } from "pages/Chat";
import { useAuthContainer } from "context/authContext";
import styled from "styled-components";
//@ts-ignore
import logo from "assets/img/girl.jpeg";

type Props = {
  contacts: Users | [];
  handleChangeChat: (chat) => void;
};

const Contacts: FC<Props> = ({ contacts, handleChangeChat }) => {
  const { user } = useAuthContainer();
  const [selected, setSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setSelected(() => index);
    handleChangeChat(contact);
  };
  return (
    <Container>
      <div className="brand">
        <div className={"logo-wrapper"}>
          {/*<img src={logo} alt={"image"} />*/}
        </div>

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
        <div className={"avatar"}>
          <img src={user.avatarImage} alt={"avatarImage"} />
        </div>
        <div className={"username"}>
          <h2>{user.username}</h2>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 20px;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
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
    }
  }
  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    .contact.selected {
      background: #9186f3;
    }
    .contact {
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
    }
  }
  .current-user {
    background: #0d0d30;
    display: flex;
    justify-content: center;
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
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .current-user .username {
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Contacts;
