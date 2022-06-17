import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import * as CONST from "./RsvpText";

function RsvpButton(props) {
  const { playdateId } = props;
  console.log(playdateId, typeof playdateId);
  const [rsvp, setRsvp] = useState(CONST.NOT_YET);
  const [yesButtonColor, setYesButtonColor] = useState(CONST.YES_COLOR);
  const [noButtonColor, setNoButtonColor] = useState(CONST.NO_COLOR);
  const [maybeButtonColor, setMaybeButtonColor] = useState(CONST.MAYBE_COLOR);
  const setButtonColor = (rsvpStatus) => {
    console.log(rsvpStatus, typeof rsvpStatus);
    if (rsvpStatus === CONST.YES) {
      setYesButtonColor(CONST.YES_COLOR);
      setNoButtonColor("secondary");
      setMaybeButtonColor("secondary");
    } else if (rsvpStatus === CONST.NO) {
      setYesButtonColor("secondary");
      setNoButtonColor(CONST.NO_COLOR);
      setMaybeButtonColor("secondary");
    } else if (rsvpStatus === CONST.MAYBE) {
      setYesButtonColor("secondary");
      setNoButtonColor("secondary");
      setMaybeButtonColor(CONST.MAYBE_COLOR);
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
    <div className="d-flex justify-content-center">
      <Button variant={yesButtonColor} value={CONST.YES} onClick={rsvpHandler}>
        {" "}
        Yes
      </Button>
      <Button variant={noButtonColor} value={CONST.NO} onClick={rsvpHandler}>
        {" "}
        No
      </Button>
      <Button
        variant={maybeButtonColor}
        value={CONST.MAYBE}
        onClick={rsvpHandler}
      >
        {" "}
        Maybe
      </Button>
    </div>
  );
}

export default RsvpButton;
