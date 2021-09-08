const { Router } = require('express');
const { getAllPokemons, addPokemon, getPokemonById, updatePokemon} = require('../metodos/pokemon');
const router = Router();


router.get('/', getAllPokemons);
router.post('/', addPokemon);
router.get('/:id', getPokemonById);
router.put('/:id', updatePokemon); 

module.exports = router;
