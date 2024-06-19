import React, { useState, useEffect } from "react";
import Loading from "../components/Loader/Loading";
import { UserAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCardList } from "../components/store/actions/card";
import "../components/layout/MainNavigator.css";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { auth } from "../firebase";
import Meetupitem from "../components/meetups/Meetupitem";

function AllMeetups() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = UserAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const cardDetails = useSelector((state) => state.card.cardList);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCardList(searchTerm, user.uid));
      } else {
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, [searchTerm, dispatch]);

  function onDeleteMeetup(id) {}

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setSearchTerm("");
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "25px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <CiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search title"
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoMdClose className="close-icon" onClick={handleClose} />
            </div>
          </div>

          {cardDetails &&
            cardDetails.map((item, index) => {
              return item[Object.keys(item)[0]].cards.map((card) => {
                return <Meetupitem data={card} />;
              });
            })}
        </>
      )}
    </div>
  );
}
export default AllMeetups;
