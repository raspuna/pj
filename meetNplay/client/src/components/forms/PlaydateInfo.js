import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import GMap from "../GoogleMap";

function PlaydateInfo(props) {
  const {
    playdate,
    setPlaydate,
    place,
    setPlace,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    buttonText,
  } = props;

  const [dateDay, setDateDay] = useState({
    y: startDate.getFullYear(),
    m: startDate.getMonth(),
    d: startDate.getDate(),
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
    setPlaydate(playdate);
    console.log(playdate);
    props.submitHandler(playdate);
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
      <GMap place={place} setPlace={setPlace} showSearchBar={true}></GMap>
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
          <Form.Label>Place:</Form.Label>
          <Form.Control type="text" value={place} name="place" readOnly />
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
        <Button type="submit">{buttonText}</Button>
      </Form>
    </div>
  );
}

export default PlaydateInfo;
