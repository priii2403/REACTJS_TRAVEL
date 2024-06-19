import React, { useContext, useEffect, useState } from "react";
import "./MainNavigator.css";
import { Link, useLocation } from "react-router-dom";
import FavouriteContext from "../store/actions/fav-context";
import { UserAuth } from "../context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import Dropdown from "../Dropdown/Dropdown";

function MainNavigation() {
  const { user } = UserAuth();
  const location = useLocation();
  const favCtx = useContext(FavouriteContext);
  const [activeLink, setActiveLink] = useState(""); // State variable to track active link
  const [color, setColor] = useState("White");
  const [showModal, setShowModal] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 960) {
        setColor("grey");
      } else {
        setColor("White");
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showNavigation =
    location.pathname !== "/" &&
    location.pathname !== "/sign-up" &&
    location.pathname !== "/forgotPassward";

  const handleMouseEnter = () => {
    setColor("grey");
  };

  const handleMouseLeave = () => {
    setColor("White");
  };
  const toggleDropdoen = () => {
    setClick((v) => !v);
  };

  const toggleModal = () => {
    setShowModal((v) => !v);
  };

  return (
    <>
      {showNavigation && (
        <header className="header">
          <nav style={{ height: "50px", marginTop: "50px" }}>
            <ul>
              <li
                style={{
                  color: color,
                  height: "50px",
                }}
              >
                <Link
                  to="/all-meetup"
                  onClick={() => setActiveLink("all-meetup")}
                >
                  Meetups
                </Link>
              </li>
              <li>
                <Link
                  className="a"
                  to="/new-meetup"
                  style={{
                    color: color,
                  }}
                  onClick={() => setActiveLink("new-meetup")}
                >
                  New Meetup
                </Link>
              </li>
              <li>
                <Link
                  to="/favourite"
                  style={{
                    color: color,
                  }}
                  onClick={() => setActiveLink("favourite")}
                >
                  Favourite
                  <span className="badge">{favCtx.totalFavourite}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/chatScreen"
                  style={{
                    color: color,
                  }}
                  onClick={() => setActiveLink("favourite")}
                >
                  ChatScreen
                </Link>
              </li>

              <li>
                <Link
                  to="/all-meetup"
                  style={{
                    color: color,
                  }}
                  onClick={() => toggleDropdoen()}
                >
                  More Info
                  <IoMdArrowDropdown
                    onClick={toggleDropdoen}
                    style={{ stroke: "none", color: "white" }}
                  />
                </Link>
                {click && (
                  <Dropdown
                    toggleDropdoen={toggleDropdoen}
                    toggleModal={toggleModal}
                  />
                )}
              </li>
            </ul>
          </nav>
        </header>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h1>Welcome {user && user.email.split("@")[0]}</h1>
            <h2>About Us</h2>
            <p>
              Welcome to our website! We are passionate travelers who believe in
              the power of documenting our adventures. Our platform is designed
              to help you capture and relive your travel memories in a
              personalized way.
            </p>
            <p>
              At Voyage Vault, we strive to provide you with the tools and
              resources to create your own digital diary of travel experiences,
              connect with fellow travelers, and discover new destinations.
            </p>
            <p>
              Join our community today and start your journey towards
              unforgettable adventures!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MainNavigation;
