import React, { useEffect } from "react";
import "./styles.css";
import { connect } from 'react-redux';
import GameBoy from "./components/GameBoy";
import PokeList from "./components/PokeList";

import { CLICK, showPokemonAction, catchPokemonAction} from './store/action'
import fetchPokemons from './store/fetchPokemons'
import Loader from './components/Loader'

const App = ({fetchPokemons, pending, showPokemon, pokemons, catchPokemon }) => {
  useEffect(() => { //useEffect recharge les pokemons dès qu'il y a un changement
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => { 
  console.log(pokemons)
  }, [pokemons]);

  if (pending){
    return <Loader />;
  }

  return (
    <div className="App">
      
      <GameBoy showPokemon={() => 
      showPokemon(pokemons)}
      catchPokemon={catchPokemon}
      />
      <PokeList />
    </div>
  );
};
const mapStateToProps = ({ pending, pokemons }) => {
  return {
      pending,
      pokemons
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchPokemons: () => dispatch(fetchPokemons()),
    click: () => dispatch({ type: CLICK }),
    showPokemon: pokemons => dispatch(showPokemonAction(pokemons)),
    catchPokemon: () => dispatch(catchPokemonAction())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
