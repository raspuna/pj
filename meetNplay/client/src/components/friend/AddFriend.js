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

  const addFriendHandler = (e) => {
    if (!friend) {
      console.log("no friend selected");
      return;
    }
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/friends`,
        {
          friend_id: friend.id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setFriend(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /* for search a user */
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/searchUser`,
        {
          email: email,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          setFriend(res.data[0]);
        } else {
          setFriend(null);
          setError("The email is not a signed user");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          setError("Unauthorized");
        }
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
          <Form onSubmit={addFriendHandler}>
            <Form.Label>{friend.name}</Form.Label>
            <Form.Control type="hidden" value={friend.id} name="friend_id" />
            <Button type="submit">Add</Button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default AddFriend;
