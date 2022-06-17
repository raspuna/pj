import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
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
        console.log("playdates", res.data);
        setPlaydates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isHost]);
  return (
    <div>
      <p>upcoming({playdates.length})</p>
      {playdates.map((p) => {
        return (
          <Card bg={CONST.rsvpColor(p.rsvp_status)} key={p.id} className="mb-3">
            {!isHost && (
              <Card.Header>{CONST.rsvpTextOnly(p.rsvp_status)}</Card.Header>
            )}
            <Card.Body>
              <Card.Title>
                <Link to={`/playdate/${p.id}`}> {p.title}</Link>
              </Card.Title>
              {!isHost && <Card.Subtitle>by {p.name}</Card.Subtitle>}
              <Card.Text>
                {new Date(p.start_time).toLocaleDateString()}{" "}
                {new Date(p.start_time).toLocaleTimeString()} ~
                {new Date(p.end_time).toLocaleTimeString()}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default PlaydateList;
