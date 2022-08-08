import React, { FC, useEffect, useRef, useState } from "react";
import { Chat as ChatContainer } from "features/Chat";
import { Axios } from "api";
import { useAuthContainer } from "context/authContext";
import { allUsersRoute, host } from "utils/ApiRoutes";
import { getLocalItem } from "utils";
import { io } from "socket.io-client";

export type Users =
  | Array<{
      email: string;
      username: string;
      avatarImage: string;
      id: string;
    }>
  | [];

const Chat: FC = () => {
  const [contacts, setContacts] = useState<[] | Array<Users>>([]);
  const { user } = useAuthContainer();

  const socket = useRef();

  useEffect(() => {
    if (Object.keys(user).length) {
      //@ts-ignore
      socket.current = io(host);
      //@ts-ignore
      socket.current.emit("add-user", user._id);
    }
  }, [Object.keys(user).length]);

  useEffect(() => {
    const getUsers = async () => {
      //@ts-ignore
      const data = await Axios(`${allUsersRoute}/${user?._id}`, "get", {
        Authorization: `Bearer ${getLocalItem("token")}`,
      });
      //@ts-ignore
      setContacts(() => data.data);
    };
    //@ts-ignore
    if (!user._id) return;
    getUsers();
    //@ts-ignore
  }, [user]);
  //@ts-ignore
  return <ChatContainer contacts={contacts} socket={socket} />;
};

export default Chat;
