import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlaydateInfo from "../forms/PlaydateInfo";
import Header from "../Header";

function Edit() {
  const navigate = useNavigate();
  const { playdateId } = useParams();
  const [playdate, setPlaydate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
        console.log("get data", res.data);
        setPlaydate(res.data);
        setPlace(res.data.place);
        setStartDate(new Date(Date.parse(res.data.start_time)));

        setStartTime(new Date(Date.parse(res.data.start_time)));
        setEndTime(new Date(Date.parse(res.data.end_time)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playdateId]);
  const submitHandler = (playdate) => {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/playdate/${playdateId}`,
        playdate,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/playdate/${playdateId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <h2>Edit Playdate</h2>
      {place && (
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
          buttonText={"Edit this Playdate"}
        />
      )}
    </div>
  );
}

export default Edit;
