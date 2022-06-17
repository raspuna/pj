import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as CONST from "../rsvp/RsvpText";
function PlaydateList(props) {
  const isHost = props.type;

  const [playdates, setPlaydates] = useState([]);
  useEffect(() => {
    const url = isHost
      ? `${process.env.REACT_APP_SERVER_ADDRESS}/api/playdates`
      : `${process.env.REACT_APP_SERVER_ADDRESS}/api/playdates/invited`;
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("what?", res.data);
        setPlaydates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isHost]);
  return (
    <div>
      <p>upcoming({playdates.length})</p>
      {playdates.map((p) => (
        <p key={p.id}>
          <Link to={`/playdate/${p.id}`}> {p.title}</Link>
          {!isHost && (
            <span>
              ({CONST.rsvpText(p.rsvp_status)}) by {p.name}
            </span>
          )}
          <div>
            {new Date(p.start_time).toLocaleDateString()}{" "}
            {new Date(p.start_time).toLocaleTimeString()} ~
            {new Date(p.end_time).toLocaleTimeString()}
          </div>
        </p>
      ))}
    </div>
  );
}

export default PlaydateList;
