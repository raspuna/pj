import axios from "axios";
import Button from "react-bootstrap/Button";
import React from "react";

function Delete(props) {
  const { id, friends, setFriends } = props;
  const deleteHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_ADDRESS}/api/friend/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        const filteredFriends = friends.filter((friend) => friend.id !== id);
        setFriends(filteredFriends);
      })
      .catch((err) => {
        console.log("delete err", err);
      });
  };
  return (
    <Button variant={"danger"} onClick={deleteHandler}>
      Delete
    </Button>
  );
}

export default Delete;
