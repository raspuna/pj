import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

function FriendList() {
  return (
    <div>
      <Header />
      <Link to="/newFriend">Add a Friend</Link>
    </div>
  );
}

export default FriendList;
