import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { AddItemContext } from "../UseContext/UseContext";
import Notification from './Notification'
const Header = () => {
  const[notiShow,setnotiShow]=useState(false);
  const { filteredData, reorderData } = AddItemContext();
  const [isLoggedUser, setIsLoggedUser] = useState("Banavath Prashanth");

  console.log(reorderData);
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

          <Link
 
            style={{ textDecoration: "none", color: "black" }}
          >
            {" "}
            <FontAwesomeIcon icon={faBell} style={{ fontSize: "25px" }} onClick={()=>setnotiShow(!notiShow)}/>
            <sup
              style={{
                fontSize: "20px",
                color: "white",
                backgroundColor: "red",
                padding: "3px 7px",
                borderRadius: "50%",
              }}
            >
              {reorderData.length}
            </sup>
          </Link>
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
      {
        notiShow&& <Notification />
      }
     
    </>
  );
};

export default Header;
