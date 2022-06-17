import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, FormGroup, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import GMap from "../GoogleMap";

function updateTime(stime, etime, dateDay) {
  stime.setFullYear(dateDay.y);
  stime.setMonth(dateDay.m);
  stime.setDate(dateDay.d);
  etime.setFullYear(dateDay.y);
  etime.setMonth(dateDay.m);
  etime.setDate(dateDay.d);
}

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
  const [errors, setErrors] = useState({});
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
    updateTime(startTime, endTime, dateDay);
    setStartTime(startTime);
    setEndTime(endTime);
    playdate.startTime = startTime;
    playdate.endTime = endTime;
    playdate.place = place;
    setPlaydate(playdate);
    console.log(playdate);
    props.submitHandler(playdate, setErrors);
  };
  const changeHandler = (e) => {
    setPlaydate({ ...playdate, [e.target.name]: e.target.value });
  };
  const setDateHandler = (day) => {
    if (!day) {
      return;
    }
    setStartDate(day);
    setDateDay({ y: day.getFullYear(), m: day.getMonth(), d: day.getDate() });
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
          {errors.title && (
            <Form.Text className="text-danger">{errors.msg}</Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Place:</Form.Label>
          <Form.Control type="text" value={place} name="place" readOnly />
          {errors.place && (
            <Form.Text className="text-danger">{errors.msg}</Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setDateHandler(date)}
          />
        </FormGroup>
        <div className="d-flex">
          <FormGroup>
            <Form.Label>Start Time:</Form.Label>
            <DatePicker
              selected={startTime}
              onChange={(time) => {
                if (time) {
                  setStartTime(time);
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>End Time:</Form.Label>
            <DatePicker
              selected={endTime}
              onChange={(time) => {
                if (time) {
                  setEndTime(time);
                }
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </FormGroup>
        </div>{" "}
        {errors.time && (
          <Form.Text className="text-danger">{errors.msg}</Form.Text>
        )}
        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit" className="mt-4">
            {buttonText}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PlaydateInfo;
