import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaydateInfo from "../forms/PlaydateInfo";
import Header from "../Header";

function New() {
  const navigate = useNavigate();
  const [playdate, setPlaydate] = useState({
    title: "",
    startTime: "",
    endTime: "",
    place: "",
  });
  const submitHandler = (playdate) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/playdates`, playdate, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/playdates");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <PlaydateInfo
        playdate={playdate}
        setPlaydate={setPlaydate}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default New;
