import React, { useEffect, useRef } from "react";
import "./ChatScreen.css";
import { useSelector } from "react-redux";
import { UserAuth } from "../context/AuthContext";

const Message = ({ message }) => {
  const { user } = UserAuth();
  const ref = useRef();

  const data = useSelector((state) => state.chat.user);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const renderDoucumnet = (fileName) => {
    return (
      <div
        style={{
          height: "40px",
          width: "100px",
          paddingRight: "30px",
          backgroundColor: "#2f2d52",
          padding: "10px",
          color: "#ffff",
          borderTopLeftRadius: message.senderId === user.uid ? "5px" : 0,
          borderTopRightRadius: message.senderId === user.uid ? 0 : "5px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      >
        {fileName}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === user.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === user.uid
              ? user?.photoURL
                ? user?.photoURL
                : "https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : data?.user?.photoURL
              ? data?.user?.photoURL
              : "https://media.istockphoto.com/id/1370529942/photo/portrait-of-a-young-man-standing-with-his-arms-crossed-on-graduation-day.jpg?s=2048x2048&w=is&k=20&c=mOaK_cxOgT34GoxhylYtxsUR1UTmentNQrakPpGqyDs="
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
        {message.pdf && renderDoucumnet("pdf File")}
        {message.audio && renderDoucumnet("Audio File")}
        {message.default && renderDoucumnet("other File")}
        {message.video && renderDoucumnet("Video File")}
      </div>
    </div>
  );
};

export default Message;
