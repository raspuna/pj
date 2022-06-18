import React from "react";
import Logout from "./Logout";
import NavBar from "./NavBar";
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
