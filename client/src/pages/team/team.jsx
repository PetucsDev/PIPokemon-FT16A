import React from "react";
import style from "./team.module.css";
import {Card} from "../../components/cards/card";
import {useSelector} from "react-redux";

export const Team = () => {
    const pokemon = useSelector((state) => state.team);

    return(
        <div className = {style.container}>
            <Card array={pokemon} img={'https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif'}/>
        </div>
    );
};