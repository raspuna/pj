import React from "react";
import Header from "./Header";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import "./Header.css";
const titleFont = {
  fontFamily: "Mystery_Quest",
  marginRight: "5px",
  color: "#FD5E53",
};
function About() {
  return (
    <div>
      <Header />
      <div className="d-flex align-items-baseline">
        <h3>
          About<span style={titleFont}> MeetNPlay</span>
        </h3>
        <p className="text-muted"> by Kyeongeun Choi </p>
      </div>
      <p>Description</p>
      <ul>
        <span style={titleFont}> MeetNPlay</span>is a playdate scheduler.
      </ul>
      <ul> Add friends, and invite them to my playdate easily!</ul>
      <p>
        Why <span style={titleFont}> MeetNPlay</span>?
      </p>
      <ul>
        <li>Add place address easily</li>
        <li>Invite easily</li>
        <li>Check RSVP easily</li>
      </ul>
      <p>Stack</p>
      <ul>MySQL - express, react, node</ul>
      <p>Challege</p>
      <ol>
        <li>How can I connect MySql to Node?</li>
        <li>How can I add a map my app?</li>
        <li>How can I add authenticate in my app?</li>
        <li>How can I apply bootstrap theme?</li>
      </ol>
      <p>What I've learn</p>
      <ul>
        <li>MySql-Node api</li>
        <li>Google Map api</li>
        <li>Jsonwebtoken authentication</li>
        <li>
          React-bootstrap theme -{" "}
          <a href="https://bootswatch.com/">bootswatch</a>
        </li>
      </ul>
    </div>
  );
}

export default About;
