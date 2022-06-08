import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <NavLink to="/playdate">Playdate</NavLink>
      <NavLink to="/friends">Friend</NavLink>
    </div>
  );
}

export default NavBar;