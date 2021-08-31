import React , {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {useDispatch} from "react-redux";
import {add} from "../../actions";


export const Pokemon = () => {
    const { id } = useParams();
  
    const dispatch = useDispatch();
  
    const history = useHistory();
  
    const [pokemon, setPokemon] = useState({});
  
    const addTeam = (pokemon) => {
      dispatch(add(pokemon));
    };
  
    useEffect(() => {
      detalles();
    });
  
    const detalles = async () => {
      const data = await fetch(`http://localhost:3001/pokemons/${id}`);
      const pokemon = await data.json();
      setPokemon(pokemon);
    };
  
    return (
      <>
        <div className={style.container}>
          <h1>{pokemon.name}</h1>
          <h2>#{pokemon.id}</h2>
  
          <div class={style.pokebola}>
            <p>Capturar</p>
            <button
              onClick={() => {
                history.push("/team");
                addTeam({
                  id: pokemon.id,
                  name: pokemon.name,
                  type: pokemon.type,
                  img: pokemon.img,
                });
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" //VER SI ES ESA FOTO
                alt=""
              />
            </button>
          </div>
  
          <div className={style.ima}>
            <img src={pokemon.img} alt="" />
            <div className={style.parrafo}>
              <p>peso: {pokemon.weight}kg</p>
              <p>altura: {pokemon.height}ft</p>
            </div>
          </div>
  
          <div className={style.type}>
            {pokemon.type
              ? pokemon?.type.map((t) => <h3 className={style[`${t}`]}>{t}</h3>)
              : null}
          </div>
          <div className={style.meter}>
            <div className={style.type}>
              <div>
                <meter
                  min="0"
                  max="120"
                  value={pokemon.vida}
                  low="25"
                  high="100"
                  optimum="120"
                />
                <p>
                  hp ------ <span>{pokemon.vida}</span>
                </p>
              </div>
              <div>
                <meter
                  min="0"
                  max="120"
                  value={pokemon.fuerza}
                  low="25"
                  high="100"
                  optimum="120"
                />
                <p>
                  fuerza ------ <span>{pokemon.fuerza}</span>
                </p>
              </div>
            </div>
            <div className={style.type}>
              <div>
                <meter
                  min="0"
                  max="120"
                  value={pokemon.defensa}
                  low="25"
                  high="100"
                  optimum="120"
                />
                <p>
                  defensa ------ <span>{pokemon.defensa}</span>
                </p>
              </div>
              <div>
                <meter
                  min="0"
                  max="120"
                  value={pokemon.velocidad}
                  low="25"
                  high="100"
                  optimum="120"
                />
                <p>
                  velocidad ------ <span>{pokemon.velocidad}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };