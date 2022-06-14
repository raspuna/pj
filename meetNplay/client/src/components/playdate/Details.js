import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoogleMap from "../GoogleMap";
import Header from "../Header";

function Details() {
  const { playdateId } = useParams();
  const [playdate, setPlaydate] = useState(null);
  const [place, setPlace] = useState("");
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/playdate/${playdateId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setPlaydate({ ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playdateId]);
  return (
    <div>
      <Header />
      Details
      <h2>{playdate && playdate.title} </h2>
      {playdate && (
        <GoogleMap
          place={playdate && playdate.place}
          setPlace={setPlace}
          showSearchBar={false}
        />
      )}
      <p> place : {playdate && playdate.place}</p>
      <p> Date: {playdate && playdate.start_time}</p>
      <p>start time:{playdate && playdate.start_time}</p>
      <p>end time:{playdate && playdate.end_time}</p>
      <p>Edit | Delete</p>
    </div>
  );
}

export default Details;
