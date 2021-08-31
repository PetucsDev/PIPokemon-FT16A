import React from "react";
import {Link} from "react-router-dom";
import style from "./navbar.module.css";


export const navbar = () => {
    return (
        <div>
            <header className ={style.header}>
                <Link to = "/" className = {style.logo}>
                    <img src = "" alt = ""/>
                </Link>
                <ul>
                            //VER COMO ORGANIZAR LAS PAGINAS XDN'T
                </ul>
            </header>
        </div>
    )
}