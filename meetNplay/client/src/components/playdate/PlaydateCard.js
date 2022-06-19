import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import * as CONST from "../rsvp/RsvpText";
function PlaydateCard(props) {
  const { p, isHost } = props;
  return (
    <Link className="text-decoration-none" to={`/playdate/${p.id}`}>
      <Card
        bg={
          new Date(p.start_time) < Date.now()
            ? "secondary"
            : CONST.rsvpColor(p.rsvp_status)
        }
        key={p.id}
        className="mb-3"
      >
        {!isHost && (
          <Card.Header>{CONST.rsvpTextOnly(p.rsvp_status)}</Card.Header>
        )}
        <Card.Body>
          <Card.Title>{p.title}</Card.Title>
          {!isHost && <Card.Subtitle>by {p.name}</Card.Subtitle>}
          <Card.Text>
            {new Date(p.start_time).toLocaleDateString()}{" "}
            {new Date(p.start_time).toLocaleTimeString()} ~
            {new Date(p.end_time).toLocaleTimeString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default PlaydateCard;
