import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import * as RSVP from "../../constants";

function RsvpButton(props) {
  const { playdateId } = props;
  console.log(playdateId, typeof playdateId);
  const [rsvp, setRsvp] = useState(RSVP.NOT_YET);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/rsvp/${playdateId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("rsvp get", res);
        setRsvp(res.data.rsvp_status);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);
  const rsvpHandler = (e) => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/rsvp`,
        {
          rsvp: Number(e.target.value),
          playdateId: playdateId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setRsvp(e.target.value);
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button value={RSVP.YES} onClick={rsvpHandler}>
        {" "}
        Yes
      </Button>
      <Button variant={"danger"} value={RSVP.NO} onClick={rsvpHandler}>
        {" "}
        No
      </Button>
      <Button variant={"success"} value={RSVP.MAYBE} onClick={rsvpHandler}>
        {" "}
        Maybe
      </Button>
    </>
  );
}

export default RsvpButton;
