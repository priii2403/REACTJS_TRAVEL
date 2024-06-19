import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
const Messages = () => {
  const db = getFirestore();

  const [messages, setMessages] = useState([]);

  const data = useSelector((state) => state?.chat);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, `chats/${data.chatId}`), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      if (data.chatId) {
        unSub();
      }
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => {
        return <Message message={m} key={m.id} />;
      })}
    </div>
  );
};

export default Messages;
