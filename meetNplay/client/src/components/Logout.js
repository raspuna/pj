import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
        navigate("/");
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
      Hello! {user && user.name}
      <Button
        variant="transparent"
        className="ms-2"
        size="sm"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
