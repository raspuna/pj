import axios from "axios";
import Button from "react-bootstrap/Button";
import React from "react";

function Delete(props) {
  const { playdateId, callbackFunction } = props;
  const deleteHandler = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/playdate/${playdateId}`,
        { withCredentials: true }
      )
      .then((res) => {
        callbackFunction();
      })
      .catch((err) => {
        console.log("delete err", err);
      });
  };
  return <Button onClick={deleteHandler}>Delete</Button>;
}

export default Delete;
