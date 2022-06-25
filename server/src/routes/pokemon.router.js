const {Router} = require ('express')
const router = Router ()
const PokemonService = require ('../services/pokemon.service.js')
const pokemonService = new PokemonService ()

router.get ('/', async (req, res) => {
    try {
        const {name} = req.query
        if (name) {
            const pokemon = await pokemonService.findByName (name)
            pokemon.length ? res.send (pokemon) : res.status (404).send ('Sorry, that pokemon does not exist!')
        } else {
            const pokemons = await pokemonService.getAll ()
            res.send (pokemons)
        }
    } catch (e) {
        console.log (e)
    }
})
router.get ('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const pokemon = await pokemonService.findById (id)
        pokemon.length ? res.send (pokemon) : res.status (404).send ('Sorry, that pokemon does not exist!')
    } catch (e) {
        console.log (e)
    }
})
router.post ('/', async (req, res) => {
    try {
        const {name, health, attack, defense, specialAttack, specialDefense, speed, height, weight, img, types} = req.body
        const pokemon = await pokemonService.create (name, health, attack, defense, specialAttack, specialDefense, speed, height, weight, img, types)
        pokemon ? res.send (pokemon) : res.status (404).send ('Sorry, that pokemon already exists!')
    } catch (e) {
        console.log (e)
    }
})

module.exports = router
