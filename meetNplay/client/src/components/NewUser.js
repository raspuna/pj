import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserInfo from "./forms/UserInfo";

function NewUser() {
  const navigate = useNavigate();
  const addUser = (user) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success");
        navigate("/home");
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
