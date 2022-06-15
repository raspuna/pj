import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      <p>
        {" "}
        Date: {playdate && new Date(playdate.start_time).toLocaleDateString()}
      </p>
      <p>
        start time:
        {playdate && new Date(playdate.start_time).toLocaleTimeString()}
      </p>
      <p>
        end time:{playdate && new Date(playdate.end_time).toLocaleTimeString()}
      </p>
      <p>
        {playdate && (
          <>
            <Link to={`/playdate/edit/${playdate.id}`}>Edit</Link> | Delete
          </>
        )}
      </p>
    </div>
  );
}

export default Details;
