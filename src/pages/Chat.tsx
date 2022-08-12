import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chat as ChatContainer } from "features/Chat";
import { Axios } from "api";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContainer } from "context/authContext";
import { allUsersRoute, host } from "utils/ApiRoutes";
import { getLocalItem } from "utils";
import { LOAD_STATE, Pages } from "config";

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
  const [contactsLoading, setContactsLoading] = useState<LOAD_STATE | "">("");
  const { user } = useAuthContainer();
  const { state } = useLocation();
  const navigate = useNavigate();

  const socket = useRef();

  useEffect(() => {
    if ((state as any)?.login) {
      //@ts-ignore
      toast.success("Welcome to Pora vipit chat", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    if (!Object.keys(user).length) return;
    //@ts-ignore
    if (!user?.isAvatarImageSet) return navigate(`/${Pages.AVATAR}`);
  }, [user]);

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
      setContactsLoading(LOAD_STATE.LOADING);
      //@ts-ignore
      const data = await Axios(`${allUsersRoute}/${user?._id}`, "get", {
        Authorization: `Bearer ${getLocalItem("token")}`,
      });
      //@ts-ignore
      setContacts(() => data.data);
      setContactsLoading("");
    };
    //@ts-ignore
    if (!user._id) return;
    getUsers();
    //@ts-ignore
  }, [user]);

  return (
    <>
      <ChatContainer
        /*//@ts-ignore*/
        contacts={contacts}
        socket={socket}
        contactsLoading={contactsLoading}
      />

      <ToastContainer />
    </>
  );
};

export default Chat;
