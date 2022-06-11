import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

function PlaydateList() {
  return (
    <div>
      <Header />
      <Link to="/newPlaydate">New Playdate</Link>
      <p>List</p>
    </div>
  );
}

export default PlaydateList;
