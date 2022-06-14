import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

function PlaydateList() {
  const [playdates, setPlaydates] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/playdates`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("what?", res.data);
        setPlaydates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Header />
      <Link to="/newPlaydate">New Playdate</Link>
      <p>upcoming({playdates.length})</p>
      {playdates.map((p) => (
        <p>
          <p>
            <Link to={`/playdate/${p.id}`}> {p.title}</Link>
          </p>
          <p>{p.start_time}</p>
        </p>
      ))}
      <p>List</p>
    </div>
  );
}

export default PlaydateList;
