import React, { useState, useEffect } from "react";
import "./ChatScreen.css";
import { UserAuth } from "../context/AuthContext";
import "firebase/database";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Searchbar = () => {
  const { user } = UserAuth();
  const db = getFirestore();

  const [username, setUsername] = useState("");
  const [userer, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [list, setlist] = useState([]);

  const bookCollectionRef = collection(db, "users");
  const bookCollectionRef1 = collection(db, "usersChats");

  useEffect(() => {
    const callApi = async () => {
      try {
        const usersSnapshot = await getDocs(bookCollectionRef);
        const usersSnapshot1 = await getDocs(bookCollectionRef1);
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        setlist(usersData);
        setUser(usersData);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };
    callApi();
  }, []);

  const handleKey = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (username.trim() !== "") {
      setUsername(username.trim());
    }
  };

  const handleSelect = async (s_user) => {
    const combinedId =
      user.uid > s_user.uid ? user.uid + s_user.uid : s_user.uid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log("Chat document created successfully!");
      }
      const updateData = {
        [`${combinedId}.userInfo`]: {
          uid: s_user.uid,
          displayName: s_user.name,
          photoURL: s_user?.profile,
        },
        [`${combinedId}.date`]: serverTimestamp(),
      };

      const userChatsRef = doc(db, `usersChats/${user.uid}`);
      await updateDoc(userChatsRef, updateData);

      const selectChatsRef1 = doc(db, `usersChats/${s_user.uid}`);
      await updateDoc(selectChatsRef1, updateData);
      const index = list.findIndex((userChat) => userChat.uid === user.uid);

      if (index !== -1) {
        list[index].uid = user.uid;

        try {
          console.log("UserChats document updated successfully!");
        } catch (error) {
          console.error("Error updating userChats document:", error);
        }
      } else {
        console.error("Specified uid not found in userChats array.");
      }
    } catch (err) {
      console.error("Error handling chats:", err);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {userer &&
        userer.map((s_user) => {
          return (
            <div
              className="userChat"
              onClick={() => {
                handleSelect(s_user);
              }}
            >
              <img src={s_user.profile} alt="" />
              <div className="userChatInfo">
                <span style={{ fontFamily: "Playfair" }}>{s_user.name}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Searchbar;
