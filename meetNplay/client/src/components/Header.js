import React from "react";
import Logout from "./Logout";
import NavBar from "./NavBar";
import "./Header.css";

function Header() {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Logout />
      </div>
      <NavBar />
    </div>
  );
}

export default Header;
