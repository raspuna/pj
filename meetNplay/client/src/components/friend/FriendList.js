import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
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
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>My Friends</h2>
        <Link className="text-info" to="/newFriend">
          Add a Friend
        </Link>
      </div>

      <Table striped>
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
      </Table>
    </div>
  );
}

export default FriendList;
