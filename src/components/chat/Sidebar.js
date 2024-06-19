import React from "react";
import "./ChatScreen.css";
import NavScreen from "./NavScreen";
import Searchbar from "./Searchbar";
import Chats from "./Chats";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavScreen />
      <Searchbar />
      <Chats />
    </div>
  );
};

export default Sidebar;
