import React from "react";
import axios from "axios";
import UserInfo from "./forms/UserInfo";

function NewUser() {
  const addUser = (user) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users`, user)
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <UserInfo submitHandler={addUser} />
    </div>
  );
}

export default NewUser;
