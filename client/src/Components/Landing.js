import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="bg-go">
      <Link to="/home">
        <button className="btn-grad"> GO HOME </button>
      </Link>
  
    </div>
  );
}

export default Landing;
