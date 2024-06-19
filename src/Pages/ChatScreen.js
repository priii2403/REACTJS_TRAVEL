import React from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatScreenSidebar from "../components/chat/ChatScreenSidebar";
import "../components/chat/ChatScreen.css";
const ChatScreen = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <ChatScreenSidebar />
      </div>
    </div>
  );
};

export default ChatScreen;
