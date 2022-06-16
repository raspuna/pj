import React, { useState } from "react";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UserInfo(props) {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [confirmed, setConfirmed] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (user.password !== confirmed) {
      setError("Password does not match");
    } else {
      props.submitHandler(user);
    }
  };

  const changeHandler = (e) => {
    setError("");
    if (e.target.name === "confirmed") {
      setConfirmed(e.target.value);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      console.log(user);
    }
  };
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <h1>Sign up</h1>
        <FormGroup>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={user.name}
            name="name"
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            value={user.email}
            name="email"
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            name="password"
            onChange={changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={user.confirmed}
            name="confirmed"
            onChange={changeHandler}
          />
          {error && <Form.Text className="text-danger">{error} </Form.Text>}
        </FormGroup>
        <FormGroup>
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            value={user.phone}
            name="phone"
            onChange={changeHandler}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default UserInfo;
