import {fetchPokemonSuccess} from './action'
import {fetchPokemonPending} from './action'

const numberOfPokemons = 10 //nb de pokemons à afficher

const urls = [] // stockage des urls

// création d'une boucle pour récupérer les urls
for(let i = 1; i <= numberOfPokemons; i++){
    urls.push(`https://pokeapi.co/api/v2/pokemon-species/${i}/`)
}

//création du tableau de réquètes, pour traiter chaque urls
const requests = urls.map(url => fetch(url))

// exporter l'ensemble des requêtes
export default () => {
    return dispatch => {
        dispatch(fetchPokemonPending()) //déclanche l'animation au chagement
        Promise.all(requests)
        .then(responses => Promise.all(responses.map(res => res.json()))) //transformer en données réelles
        .then(pokemons => pokemons.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            captureRate: pokemon.capture_rate,
            isCatch: false,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`
        })))
        .then(pokemons => dispatch(fetchPokemonSuccess(pokemons)))
    }
}