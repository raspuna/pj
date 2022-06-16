import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/getLoggedInUser`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log("Can't get logged in user", err);
      });
  }, []);
  const logoutHandler = (e) => {
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/user/logout`, {
        withCredentials: true,
      })
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
      <Link to="#">Hello! {user && user.name}</Link>|
      <Link to="#" onClick={logoutHandler}>
        Logout
      </Link>
    </div>
  );
}

export default Logout;
