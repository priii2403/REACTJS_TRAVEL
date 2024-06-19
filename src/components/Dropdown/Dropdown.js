import React, { useRef } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

function Dropdown({ toggleModal, toggleDropdoen }) {
  const dropdownRef = useRef(null);
  const { logout } = UserAuth();

  const handleAboutClick = () => {
    toggleModal();
    toggleDropdoen();
  };

  const handleSignOut = async () => {
    try {
      await logout;
      toggleDropdoen();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="dropdown5" style={{ flexWrap: true }} ref={dropdownRef}>
      <div className="dropdown-links">
        <Link to="/" onClick={handleSignOut}>
          Sign Out
        </Link>{" "}
        <Link to="/all-meetup" onClick={handleAboutClick}>
          About Us
        </Link>
      </div>
    </div>
  );
}

export default Dropdown;
