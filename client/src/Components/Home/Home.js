import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import SearchBar from "../Searchbar/SearchBar";
import { Link } from "react-router-dom";
import { getAllPokemons, getAllTypes } from '../../Actions/actions';
import { useSelector, useDispatch } from "react-redux";
import Filter from "../Filter/Filter";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const getPokemons = useSelector((state) => state.getPokemons);
  const getTypes = useSelector((state) => state.getTypes);
  const searchPokemon = useSelector((state) => state.searchPokemon);
 
  const [search, setSearch] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [pokemonsPerPage, setPokemonsPerPage] = useState(9);


  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (getTypes) {
      dispatch(getAllTypes());
    }
          //eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [dispatch]);


  
 

  const indexOfLastPost = currentPage * pokemonsPerPage;
  const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;
  const currentPokemons = getPokemons.slice(indexOfFirstPost, indexOfLastPost);
 
  const pageNumber = Math.ceil(getPokemons.length / pokemonsPerPage);
  

 

  const nextPage = () => {

    
  
      setCurrentPage((currentPage) => currentPage + 1);
      setPokemonsPerPage(12);
    
  };

  const prePage = () => {
    if (currentPage === 1){
      setPokemonsPerPage(9);
      
     
     
    } 
   else {
    
     setCurrentPage(currentPage - 1);
     setPokemonsPerPage(12);
     
     
   }
     
  };

 console.log(pokemonsPerPage);

 

  return (
    <div className="Todo">
      <SearchBar setSearch={setSearch} />
      {
        currentPokemons?.length > 0 
        ?
        <div className="home">
        <div className="filter-home">
          <Filter />
        </div>

        <div className="container">
          {search
            ? 
            searchPokemon && (
              <div className = "div-search">
                  <Card 
                    name={searchPokemon.name}
                    image={searchPokemon.image}
                    types={searchPokemon.types}
                    key={searchPokemon.id}
                    height={searchPokemon.height}
                    weight = {searchPokemon.weight}
                    hp = {searchPokemon.hp}
                    attack = {searchPokemon.attack}
                    defense = {searchPokemon.defense}
                    speed = {searchPokemon.speed} 
                  />
                </div>
              )
            : currentPokemons?.length > 0 &&
              currentPokemons.map((pokemon) => (
                <Link className="link" to={`/cardDetail/${pokemon.id}`}>
                  <Card
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                    key={pokemon.id}
                  />
                 </Link>
                
                 
              ))}
        </div>
        <div className="paginate">
          <button
            // className={`${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => {
              prePage()
            }}
          >
            Previous
          </button>
          <button
             className={`${currentPage === pageNumber ? "disabled" : ""}`}
            onClick={() => {
              nextPage();
            }}
          >
            Next
          </button>
        </div>
      </div>
       : <div className="content">
         <div className="loading">
           </div>
       </div>
      }
     
    </div>
  );
}

export default Home;
