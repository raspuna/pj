import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/logout`)
      .then((res) => {
        console.log(res);
        console.log("success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Link to="#">Hello!</Link>|
      <Link to="#" onClick={logoutHandler}>
        Logout
      </Link>
    </div>
  );
}

export default Logout;
