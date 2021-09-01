import './App.css';
import {useEffect}  from "react";
import {Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LandingPage} from "./pages/landing/landing";
import {Pokedex} from "./pages/pokedex/pokedex";
import {Create} from "./pages/create/create";
import {Navbar} from "./components/navbar/navbar";
import {getPokemons, getTypes} from "./actions/actions";
import {Pokemon} from "./components/pokemon/pokemon";
import {Team} from "./pages/team/team";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  });

  return (
    <>
      <Navbar />
      <Route exact path="/pokedex/:id" >
        <Pokemon />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Pokedex />
      </Route>
      <Route exact path="/create">
        <Create />
      </Route>
      <Route exact path="/team">
        <Team/>
      </Route>
     
    </>
  );
}


export default App;
