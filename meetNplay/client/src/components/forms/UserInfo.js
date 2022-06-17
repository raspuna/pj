import React, { useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";

function UserInfo(props) {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [confirmed, setConfirmed] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.submitHandler({ user: user, confirmed: confirmed }, setErrors);
  };

  const changeHandler = (e) => {
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
          <Form.Label>
            Name<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            value={user.name}
            name="name"
            onChange={changeHandler}
          />
          {errors.name && (
            <Form.Text className="text-danger">{errors.msg}</Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Email<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            value={user.email}
            name="email"
            onChange={changeHandler}
          />
          {errors.email && (
            <Form.Text className="text-danger">{errors.msg}</Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Password<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            name="password"
            onChange={changeHandler}
          />
          {errors.password && (
            <Form.Text className="text-danger">{errors.msg}</Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>
            Confirm Password<span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="password"
            value={user.confirmed}
            name="confirmed"
            onChange={changeHandler}
          />
          {errors.confirmed && (
            <Form.Text className="text-danger">{errors.msg}</Form.Text>
          )}
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
