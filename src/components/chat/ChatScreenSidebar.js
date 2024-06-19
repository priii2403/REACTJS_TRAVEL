import React from "react";
import "./ChatScreen.css";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import Messages from "./Messages";
import TextInput from "./TextInput";
import { useSelector } from "react-redux";
import { UserAuth } from "../context/AuthContext";
const ChatScreenSidebar = () => {
  const data = useSelector((state) => state.chat);

  const { user } = UserAuth();

  return (
    <div className="chatbar">
      <div className="chatInfo">
        <span>
          {data?.chatId ? data.user.displayName : user?.email?.split("@")[0]}
        </span>
        <div className="chatIcons">
          <BsFillCameraVideoFill />
          <IoMdPersonAdd />
          <IoIosMore />
        </div>
      </div>
      {data?.chatId ? <Messages /> : <div className="messages" />}
      <TextInput />
    </div>
  );
};

export default ChatScreenSidebar;
