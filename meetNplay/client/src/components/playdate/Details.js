import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GoogleMap from "../GoogleMap";
import Header from "../Header";
import DeleteButton from "./Delete";
import Invite from "../rsvp/Invite";
import Members from "../rsvp/Members";
import RsvpButton from "../rsvp/RsvpButton";

function Details() {
  const navigate = useNavigate();
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
      <h2>{playdate && playdate.title} </h2>
      {playdate && (
        <GoogleMap
          place={playdate && playdate.place}
          setPlace={setPlace}
          showSearchBar={false}
        />
      )}
      <p> Place : {playdate && playdate.place}</p>
      <p>
        {" "}
        Date : {playdate && new Date(playdate.start_time).toLocaleDateString()}
      </p>
      <p>
        Start time :
        {playdate && new Date(playdate.start_time).toLocaleTimeString()}
      </p>
      <p>
        End time :{playdate && new Date(playdate.end_time).toLocaleTimeString()}
      </p>
      <p>
        {playdate &&
          (playdate.isHost ? (
            <div className="d-flex justify-content-center">
              <Link
                className="btn btn-warning"
                to={`/playdate/edit/${playdate.id}`}
              >
                Edit
              </Link>{" "}
              <DeleteButton
                playdateId={playdate.id}
                callbackFunction={() => navigate(`/playdates`)}
              ></DeleteButton>
            </div>
          ) : (
            <RsvpButton playdateId={playdate.id} />
          ))}
      </p>
      {playdate && playdate.isHost && <Invite playdateId={playdate.id} />}
      {playdate && !playdate.isHost && (
        <Members hostName={playdate.name} playdateId={playdate.id} />
      )}
    </div>
  );
}

export default Details;
