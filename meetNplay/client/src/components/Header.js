import React from "react";
import Logout from "./Logout";
import NavBar from "./NavBar";

function Header() {
  return (
    <div className="d-flex justify-content-between">
      <h1>MeetNPlay</h1>
      <NavBar />
      <Logout />
    </div>
  );
}

export default Header;
