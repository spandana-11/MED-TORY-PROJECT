import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="w-100  header ">
        <div className="logo ">
          <img src="images/Logo-02-1x1.png" alt="" width={"20%"} />
        </div>
        <div className="loggedUser">
          <div className="loggedPic"></div>
          <div className="loggedName"></div>
        </div>
        <br />
      </header>
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
