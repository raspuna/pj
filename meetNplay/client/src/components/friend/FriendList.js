import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import DeleteFriend from "./Delete";

function FriendList() {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/friends`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      });
  }, []);
  return (
    <div>
      <Header />
      <Link to="/newFriend">Add a Friend</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id}>
              <td>{friend.name}</td>
              <td>{friend.email}</td>
              <td>
                <DeleteFriend
                  id={friend.id}
                  friends={friends}
                  setFriends={setFriends}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FriendList;
