import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import PlaydateList from "./PlaydateList";
const HOST = true;
const INVITED = false;
function Main() {
  return (
    <>
      <Header />

      <div className="d-flex justify-content-between align-items-baseline">
        <h2>My playdates</h2>{" "}
        <Link className="text-info" to="/newPlaydate">
          New Playdate
        </Link>
      </div>
      <PlaydateList type={HOST} />
      <h2>Invited</h2>
      <PlaydateList type={INVITED} />
    </>
  );
}
export default Main;
