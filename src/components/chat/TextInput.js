import React, { useState } from "react";
import "./ChatScreen.css";
import { IoIosAttach } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { UserAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, uploadBytes, ref, getStorage } from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const TextInput = () => {
  const { user } = UserAuth();
  const db = getFirestore();
  const storage = getStorage();

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // console.log("img", img);
  const data = useSelector((state) => state.chat);

  const getUrlFromFirebase = async (image) => {
    if (image == null) return; // Check if image is null
    const storageRef = ref(storage, `chatImage/${uuid()}`);

    try {
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const getFileExt = (type) => {
    console.log("tt", type);
    return type === "image/jpeg" || type === "image/png"
      ? "image"
      : type === "video/mp4"
      ? "video"
      : type === "text/csv"
      ? "csv"
      : type === "application/pdf"
      ? "pdf"
      : type === "audio/mpeg"
      ? "audio"
      : "";
  };

  async function uploadPDFAndSaveURL(file) {
    try {
      const storageRef = ref(storage, file.name);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File uploaded successfully!", downloadURL);
        return downloadURL;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      console.log("PDF uploaded successfully!");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      throw error;
    }
  }

  const uploadAudioAndSaveURL = async (file) => {
    const storageRef = ref(storage, file.name);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("audio uploaded successfully!", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSend = async () => {
    if (img) {
      const fileExt = getFileExt(img.type);
      const ChatsRef = doc(db, `chats/${data.chatId}`);
      switch (fileExt) {
        case "image":
          const imageUrl = await getUrlFromFirebase(img);
          await updateDoc(ChatsRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              img: imageUrl,
            }),
          });
          break;
        case "pdf":
          const downloadURLPdf = await uploadPDFAndSaveURL(img);
          await updateDoc(ChatsRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              pdf: downloadURLPdf,
            }),
          });
          break;
        case "audio":
          const downloadURLaudio = await uploadAudioAndSaveURL(img);
          console.log("downloadURL", downloadURLaudio);
          await updateDoc(ChatsRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              audio: downloadURLaudio,
            }),
          });
          break;
        case "video":
          const downloadURLvideo = await uploadAudioAndSaveURL(img);
          console.log("downloadURL", downloadURLvideo);
          await updateDoc(ChatsRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              video: downloadURLvideo,
            }),
          });
          break;

        default:
          const downloadURLDefault = await uploadAudioAndSaveURL(img);

          await updateDoc(ChatsRef, {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: user.uid,
              date: Timestamp.now(),
              default: downloadURLDefault,
            }),
          });
          break;
      }
    } else {
      const ChatsRef = doc(db, `chats/${data.chatId}`);
      await updateDoc(ChatsRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    const userChatsRef = doc(db, `usersChats/${user.uid}`);
    await updateDoc(userChatsRef, {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    const userrChatsRef = doc(db, `usersChats/${data.user.uid}`);
    await updateDoc(userrChatsRef, {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="send">
          <IoIosAttach style={{ height: "25px", width: "25px" }} />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file" onChange={(e) => setImg(e.target.files[0])}>
            <CiImageOn style={{ height: "25px", width: "25px" }} />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default TextInput;
