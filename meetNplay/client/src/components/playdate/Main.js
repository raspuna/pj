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
      <Link to="/newPlaydate">New Playdate</Link>
      <h3>My playdates</h3>
      <PlaydateList type={HOST} />
      <h3>Invited</h3>
      <PlaydateList type={INVITED} />
    </>
  );
}
export default Main;
