import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as CONST from "./RsvpText";

function FriendList(props) {
  const playdateId = props.playdateId;
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState({});
  const [rsvps, setRsvps] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/friendsInvited/${playdateId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
        for (var i = 0; i < res.data.length; i++) {
          rsvps[res.data[i].id] = res.data[i].rsvp_status;
          console.log(rsvps);
        }
        setRsvps(rsvps);
        console.log(rsvps);
      });
  }, []);
  const checkboxHandler = (e) => {
    if (e.target.id in invitations) {
      delete invitations[e.target.id];
    } else {
      setInvitations({ ...invitations, [e.target.id]: true });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    console.log(invitations);
    const friends = Object.keys(invitations);
    if (friends.length === 0) {
      console.log("nothing to do");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/rsvp`,
        {
          friends: friends,
          playdateId: playdateId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        for (var i = 0; i < friends.length; i++) {
          rsvps[friends[i]] = 0;
        }
        setInvitations({});
        setRsvps(rsvps);
        console.log(rsvps);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
              <th>RSVP</th>
            </tr>
          </thead>
          <tbody>
            {/*
              friends list
              if a friend is not invited, then drow checkbox
              else show their rsvp status
            */}
            {friends.map((friend) => (
              <tr key={friend.id}>
                <td>{friend.name}</td>
                <td>
                  {rsvps[friend.id] === null && (
                    <input
                      type="checkbox"
                      value=""
                      id={friend.id}
                      onClick={checkboxHandler}
                    />
                  )}
                </td>
                <td>
                  {rsvps[friend.id] !== null && (
                    <span>{CONST.rsvpText(rsvps[friend.id])}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <Button variant="info" type="submit">
            Invite
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FriendList;
