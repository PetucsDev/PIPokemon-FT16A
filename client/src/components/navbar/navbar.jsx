import React from "react";
import {Link} from "react-router-dom";
import style from "./navbar.module.css";


export const Navbar = () => {
    return (
        <div>
            <header className ={style.header}>
                <Link to = "/" className = {style.logo}>
                    <img src = "img/pokemon.png" alt = ""/>
                </Link>
                <ul>
                            <li><Link to="/home">Pokedex</Link></li>
                            <li><Link to="/create">Create Pokemon</Link></li>
                            <li><Link to="/team">Team</Link></li>

                </ul>
            </header>
        </div>
    );
};