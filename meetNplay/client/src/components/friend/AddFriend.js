import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { Form, Button, Card } from "react-bootstrap";
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
        setEmail("");
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
        setFriend(res.data[0]);
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          setError("Unauthorized");
        } else if (err.response && err.response.status === 400) {
          setError(err.response.data.err);
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
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>Search User</h2>
        <Link className="text-info" to="/friends">
          Back to friend list
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <Card>
          <Form onSubmit={submitHandler} className="d-flex flex-column">
            <Card.Body>
              <Card.Text>
                <Form.Control
                  type="text"
                  value={email}
                  name="email"
                  placeholder="Enter an email"
                  onChange={changeHandler}
                />
                {error && email && (
                  <Form.Text className="text-danger">{error}</Form.Text>
                )}
              </Card.Text>
              <Button variant="info" type="submit">
                Search
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </div>
      <div>
        {friend && (
          <>
            <h3>Add the user to your frined</h3>
            <Form
              onSubmit={addFriendHandler}
              className="d-flex justify-content-center align-items-baseline"
            >
              <Form.Label className="m-3">{friend.name}</Form.Label>
              <Form.Control
                type="hidden"
                value={friend.id}
                name="friend_id"
              />{" "}
              <Button variant="success" type="submit">
                Add
              </Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default AddFriend;
