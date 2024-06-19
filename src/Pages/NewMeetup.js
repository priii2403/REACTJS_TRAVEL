import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Newmeetups from "../components/meetups/Newmeetups";
import Loading from "../components/Loader/Loading";
import { auth, database } from "../firebase";
import { push, ref, update } from "firebase/database";
function NewMeetup(props) {
  const [loader, setloader] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const addMeetupHandler = async (meetupData) => {
    console.log("datata", meetupData);
    try {
      console.log("1111");

      // setloader(true);
      if (!userId) {
        console.error("User is not signed in");
        return;
      }
      console.log("2222", userId);
      console.log("34333", meetupData);
      await push(ref(database, `users/${userId}`), meetupData);
      console.log("Data added successfully");
      history("/all-meetup");
      // setloader(false);
    } catch (error) {
      console.log("22222x");
      // setloader(false);
      console.error("Error adding data:", error.message);
    }
  };

  const updateMeetupHandler = async (updatedMeetupData) => {
    const dataRef = ref(database, `users/${userId}/${updatedMeetupData.id}`);

    try {
      setloader(true);
      await update(dataRef, updatedMeetupData);
      console.log("Data updated successfully");
      history("/all-meetup");
      setloader(false);
    } catch (error) {
      setloader(false);
      console.error("Error updating data:", error.message);
    }
  };

  return (
    <section>
      <h1> ADD NEW MEETS</h1>

      {loader ? (
        <Loading />
      ) : (
        <Newmeetups
          onAddMeetup={addMeetupHandler}
          onUpdateMeetup={updateMeetupHandler}
          details={location.state ? location.state : ""}
          edit={location.state && location.state.edit}
        />
      )}
    </section>
  );
}
export default NewMeetup;
