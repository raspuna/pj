import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import * as RSVP from "../../constants";

function RsvpButton(props) {
  const { playdateId } = props;
  console.log(playdateId, typeof playdateId);
  const [rsvp, setRsvp] = useState(RSVP.NOT_YET);
  const [yesButtonColor, setYesButtonColor] = useState("primary");
  const [noButtonColor, setNoButtonColor] = useState("danger");
  const [maybeButtonColor, setMaybeButtonColor] = useState("success");
  const setButtonColor = (rsvpStatus) => {
    console.log(rsvpStatus, typeof rsvpStatus);
    if (rsvpStatus === RSVP.YES) {
      setYesButtonColor("primary");
      setNoButtonColor("secondary");
      setMaybeButtonColor("secondary");
    } else if (rsvpStatus === RSVP.NO) {
      setYesButtonColor("secondary");
      setNoButtonColor("danger");
      setMaybeButtonColor("secondary");
    } else if (rsvpStatus === RSVP.MAYBE) {
      setYesButtonColor("secondary");
      setNoButtonColor("secondary");
      setMaybeButtonColor("success");
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/rsvp/${playdateId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("rsvp get", res);
        setRsvp(res.data[0].rsvp_status);
        console.log(rsvp);
        setButtonColor(Number(res.data[0].rsvp_status));
      })
      .catch((err) => {
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
        console.log({ rsvp });
        console.log(e.target.value);
        setButtonColor(Number(e.target.value));
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button variant={yesButtonColor} value={RSVP.YES} onClick={rsvpHandler}>
        {" "}
        Yes
      </Button>
      <Button variant={noButtonColor} value={RSVP.NO} onClick={rsvpHandler}>
        {" "}
        No
      </Button>
      <Button
        variant={maybeButtonColor}
        value={RSVP.MAYBE}
        onClick={rsvpHandler}
      >
        {" "}
        Maybe
      </Button>
    </>
  );
}

export default RsvpButton;
