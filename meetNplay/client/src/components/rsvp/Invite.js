import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    console.log(friends);
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
              <th>RSVP</th>
            </tr>
          </thead>
          <tbody>
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
                <td>{rsvps[friend.id] !== null && <span>test</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button type="submit">Invite!</Button>
      </Form>
    </div>
  );
}

export default FriendList;
