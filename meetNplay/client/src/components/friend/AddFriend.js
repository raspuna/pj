import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

function AddFriend() {
  const [email, setEmail] = useState("");
  const [friend, setFriend] = useState(null);
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/searchUser`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          console.log(res.data[0]);
          setFriend(res.data[0]);
          console.log(friend.name);
        } else {
          setFriend(null);
          setError("The email is not a signed user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeHandler = (e) => {
    setError("");
    setFriend(null);
    setEmail(e.target.value);
  };
  return (
    <div>
      <Header />
      <Link to="/friends">friends</Link>
      <div>
        <Form onSubmit={submitHandler}>
          <div className="d-flex">
            <FormGroup className="d-flex">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="text"
                value={email}
                name="email"
                onChange={changeHandler}
              />
            </FormGroup>
            <Button type="submit">Search</Button>
          </div>
          {error && email && (
            <Form.Text className="text-danger">{error}</Form.Text>
          )}
        </Form>
      </div>
      <div>
        {friend && (
          <div>
            {friend.name}
            <Button>Add</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFriend;
