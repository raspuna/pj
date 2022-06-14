import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import GMap from "../GoogleMap";

//let center = new google.maps.LatLng(34.052235, -118.243683);
function PlaydateInfo() {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  let e = new Date();
  e.setHours(e.getHours() + 2);
  const [endTime, setEndTime] = useState(e);
  const [playdate, setPlaydate] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    place: "",
  });
  const [dateDay, setDateDay] = useState({
    y: new Date().getYear(),
    m: new Date().getMonth(),
    d: new Date().getDate(),
  });
  const submitHandler = (e) => {
    e.preventDefault();
    if (!playdate) {
      console.log("Something wrong, missing playdate");
      return;
    }
    startTime.setFullYear(dateDay.y);
    startTime.setMonth(dateDay.m);
    startTime.setDate(dateDay.d);
    setStartTime(startTime);
    endTime.setFullYear(dateDay.y);
    endTime.setMonth(dateDay.m);
    endTime.setDate(dateDay.d);
    setEndTime(endTime);
    console.log({ startTime });
    console.log({ endTime });
    playdate.startTime = startTime;
    playdate.endTime = endTime;
    playdate.place = place;
    console.log(playdate);
  };
  const changeHandler = (e) => {
    console.log(e);
    setPlaydate({ ...playdate, [e.target.name]: e.target.value });
    console.log(startTime);
  };
  const setDateHandler = (d) => {
    setStartDate(d);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    setDateDay({ y: year, m: month, d: day });
  };
  return (
    <div>
      <h1>New Playdate</h1>
      <GMap place={place} setPlace={setPlace}></GMap>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={playdate.title}
            name="title"
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setDateHandler(date)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Start Time:</Form.Label>
          <DatePicker
            selected={startTime}
            onChange={(time) => {
              setStartTime(time);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>End Time:</Form.Label>
          <DatePicker
            selected={endTime}
            onChange={(time) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </FormGroup>
        <Button type="submit">Make a Playdate</Button>
      </Form>
    </div>
  );
}

export default PlaydateInfo;
