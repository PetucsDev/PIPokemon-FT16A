import React from "react";
import {Link} from "react-router-dom";
import style from "./landing.module.css";

export const LandingPage = () => {
    return (
      <div className={style.container}>
        <div>
          <h1>
            <span>Find</span> all your <br />
            favorite <br />
            <span>Pokemon</span>
          </h1>
          <p>
            You can know the type of Pokemon, <br />
            its strengths, disadvantages and <br />
            abilities.
          </p>
          <Link to="/home">
            <input type="submit" value="See Pokemon" className={style.myButton} />
          </Link>
  
        
        </div>
  
        <div>
          <img src="" alt="" />
        </div>
      </div>
    );
  };
  