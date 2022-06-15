const axios = require ('axios')
const {Pokemon, Type} = require ('../db.js')
const TypeService = require ('./type.service.js')
const typeService = new TypeService ()

class PokemonService {
    constructor () {}

    async getApiPokemon () {
        const firstTwenty = await axios.get ('https://pokeapi.co/api/v2/pokemon')
        const secondTwenty = await axios.get (firstTwenty.data.next)
        let allForty = firstTwenty.data.results.concat (secondTwenty.data.results)
        allForty = allForty.map (p => p.url)

        allForty = await Promise.all (allForty.map (async (p) => await axios.get (p)
        ))
        allForty = allForty.map (p => p.data)

        const pokemons = allForty.map (p => {
            return {
                id: p.id,
                name: p.name,
                health: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                specialAttack: p.stats[3].base_stat,
                specialDefense: p.stats[4].base_stat,
                speed: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight,
                img: p.sprites.other.home.front_default,
                types: p.types.map (e => e.type.name)
            }
        })
        return pokemons
    }
    async getDBPokemon () {
        const pokemons = await Pokemon.findAll ({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
            //// Respetar la sintaxis en el include, para traer solo lo que se necesita. En este caso, el name de los types de pokemon.
        })
        return pokemons
    }
    async getAll () {
        const api = await this.getApiPokemon ()
        const DB = await this.getDBPokemon ()
        const pokemons = api.concat (DB)
        return pokemons
    }
    async findByName (name) {
        const pokemons = await this.getAll ()
        const pokemon = pokemons.filter (p => p.name.toLowerCase () === name.toLowerCase ())
        return pokemon
    }
    async findById (id) {
        const pokemons = await this.getAll ()
        const pokemon = pokemons.filter (p => p.id == id)
        //// El id va a llegar por params, y por lo tanto, como string. Por eso usar una igualdad que no sea estricta.
        return pokemon
    }
    async create (name, health, attack, defense, specialAttack, specialDefense, speed, height, weight, img, types) {
        let pokemons = await this.getAll ()
        pokemons = pokemons.map (p => p.name)

        if (pokemons.includes (name)) {
            return false
        }

        const pokemon = await Pokemon.create ({
            name: name.toLowerCase (),
            health,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed,
            height,
            weight,
            img
        })

        await typeService.getAll ()
        const type = await Type.findAll ({
            where: {
                name: types
            }
        })
        pokemon.addType (type)
        return pokemon
    }
}

module.exports = PokemonService
