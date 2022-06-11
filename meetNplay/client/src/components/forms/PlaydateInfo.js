import React, { useState } from "react";
import DatePicker from "react-datepicker";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";

function PlaydateInfo() {
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
  const changeHandler = (e) => {
    setPlaydate({ ...playdate, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Form>
        <h1>New Playdate</h1>
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
        </FormGroup>

        <FormGroup>
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>Start Time:</Form.Label>
          <DatePicker
            selected={startTime}
            onChange={(time) => setStartTime(time)}
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
