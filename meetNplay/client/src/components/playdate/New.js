import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaydateInfo from "../forms/PlaydateInfo";
import Header from "../Header";

function New() {
  const navigate = useNavigate();
  const [place, setPlace] = useState("");
  const [playdate, setPlaydate] = useState({
    title: "",
    startTime: "",
    endTime: "",
    place: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  let e = new Date();
  e.setHours(e.getHours() + 2);
  const [endTime, setEndTime] = useState(e);
  const submitHandler = (playdate, setErrors) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/playdates`, playdate, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/playdates");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.err);
        }
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>New playdates</h2>{" "}
        <Link className="text-info" to="/playdates">
          Back to list
        </Link>
      </div>
      <PlaydateInfo
        place={place}
        setPlace={setPlace}
        playdate={playdate}
        setPlaydate={setPlaydate}
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        submitHandler={submitHandler}
        buttonText={"Make a Playdate"}
      />
    </div>
  );
}

export default New;
