const axios = require ('axios')
const {Type} = require ('../db.js')

class TypeService {
    constructor () {}

    async getAll () {
        let types = await axios.get ('https://pokeapi.co/api/v2/type')
        types = types.data.results.map (t => t.name)

        await Promise.all (types.map (async (t) => {
            await Type.findOrCreate ({
                where: {
                    name: t
                }
            })
        }))
        //// Utilizo el Promise.all () para poder trabajar con async-await y .map ()

        const DBTypes = await Type.findAll ()
        return DBTypes
    }
    
    //// Ejercicio durante la defensa.
    //// Crear una ruta para crear un type. Si el mismo ya existe en la DB, hacerlo saber.
    async create (name) {
        const type = await Type.findOrCreate ({
            where: {
                name: name
            }
        })
        //// findOrCreate retorna un array con lo que haya encontrado o creado, y con un booleano indicando si lo tuvo que crear. Por eso, lo uso dentro de una const, así luego consulto que fue lo que se hizo.
        return type
    }
}

module.exports = TypeService
