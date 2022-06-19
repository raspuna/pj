import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PlaydateCard from "./PlaydateCard";
function PlaydateList(props) {
  const isHost = props.type;

  const [upcomings, setUpcomings] = useState([]);
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
        const p = res.data;
        setPlaydates(p);
        setUpcomings(
          p.filter((playdate) => new Date(playdate.start_time) >= Date.now())
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isHost]);
  return (
    <div>
      <Tabs defaultActiveKey="upcoming" className="mb-2">
        <Tab eventKey="upcoming" title={`Upcoming(${upcomings.length})`}>
          {upcomings.map((p) => {
            return <PlaydateCard p={p} isHost={isHost} />;
          })}
        </Tab>
        <Tab eventKey="all" title={`all(${playdates.length})`}>
          {playdates.map((p) => {
            return <PlaydateCard p={p} isHost={isHost} />;
          })}
        </Tab>
      </Tabs>
    </div>
  );
}

export default PlaydateList;
