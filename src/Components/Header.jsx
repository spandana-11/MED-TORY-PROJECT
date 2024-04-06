import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [isLoggedUser,setIsLoggedUser]=useState("Banavath Prashanth")
  
  return (
    <>
      {/* Header Section */}
      <header className="w-100  header ">
        <div className="logo ">
          <img src="images/Logo-02-1x1.png" alt="" width={"20%"} />
        </div>
        <div className="loggedUser">
          <div className="loggedPic">
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          <div className="loggedName">{isLoggedUser}</div>
        </div>
        <br />
      </header>

      {/* Navber Section */}
      <nav className="navber1">
        <ul className="navber-item">
          <NavLink to="/">
            <li className="nav-item ">Add item</li>
          </NavLink>
          <NavLink to="/data">
            <li className="nav-item mx-2">DataList</li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Header;
