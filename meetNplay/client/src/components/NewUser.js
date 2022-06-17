import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserInfo from "./forms/UserInfo";

function NewUser() {
  const navigate = useNavigate();
  const addUser = (user, setErrors) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success");
        navigate("/home");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log(err.response.data.err);
            setErrors(err.response.data.err);
          } else if (
            err.response.data.err.code &&
            err.response.data.err.code === "ER_DUP_ENTRY"
          ) {
            setErrors({
              email: "email",
              msg: "Email duplicated",
            });
          }
        }
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
