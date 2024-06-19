import React, { useEffect, useState } from "react";
import "./ChatScreen.css";
import { useDispatch } from "react-redux";
import { getChatdata } from "../store/actions/chat";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Chats = () => {
  const dispatch = useDispatch();

  const { user } = UserAuth();
  const db = getFirestore();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const userChatsRef = doc(db, `usersChats/${user.uid}`);
        const snapshot = await getDoc(userChatsRef);

        if (snapshot.exists()) {
          setChats(snapshot.data());
        } else {
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    if (user && user.uid) {
      getChats();
    }
  }, [user]);

  const handleSelect = (params) => {
    dispatch(getChatdata(params, user));
  };

  return (
    <div className="chats">
      {Object.keys(chats).map((key) => {
        const user = chats[key];
        const lastMessage = user?.lastMessage?.text || "";
        if (
          user.userInfo &&
          user.userInfo.displayName &&
          user.userInfo.photoURL
        ) {
          const { displayName, photoURL } = user?.userInfo;
          return (
            <div
              className="userChat"
              key={key}
              onClick={() => handleSelect(user.userInfo)}
            >
              <img src={photoURL} alt={`${displayName}'s Photo`} />
              <div className="userChatInfo">
                <span style={{ fontFamily: "Playfair" }}>{displayName}</span>
                <p>{lastMessage}</p>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Chats;
