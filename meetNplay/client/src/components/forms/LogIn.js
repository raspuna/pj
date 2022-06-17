import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

function LogIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/user/login`,
        loginInfo,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log("login success");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          setError(err.response.data.err);
        }
      });
  };
  const changeHandler = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    setError("");
  };
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            value={loginInfo.email}
            name="email"
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={loginInfo.password}
            name="password"
            autoComplete="on"
            onChange={changeHandler}
          />
        </FormGroup>
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        <Button type="submit">LogIn</Button>
      </Form>
    </div>
  );
}

export default LogIn;
