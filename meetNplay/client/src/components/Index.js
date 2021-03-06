import React from "react";
import LogIn from "./forms/LogIn";
import { Link } from "react-router-dom";
import Title from "./Title";

function Index() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <h1 className="d-flex justify-content-center mt-5">
          <Title />
        </h1>
        <LogIn />
        <div className="d-flex justify-content-end">
          Don't have an account yet?
          <Link className="ms-2" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
