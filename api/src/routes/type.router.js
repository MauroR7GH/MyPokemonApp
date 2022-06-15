const {Router} = require ('express')
const router = Router ()
const TypeService = require ('../services/type.service.js')
const typeService = new TypeService ()

router.get ('/', async (req, res) => {
    try {
        const DBTypes = await typeService.getAll ()
        res.send (DBTypes)
    } catch (e) {
        console.log (e)
    }
})

//// Ejercicio durante la defensa.
//// Crear una ruta para crear un type. Si el mismo ya existe en la DB, hacerlo saber.
router.post ('/', async (req, res) => {
    try {
        const {name} = req.body
        const type = await typeService.create (name)
        type[1] ? res.send (type[0]) : res.status (404).send ('Sorry, that type of pokemon already exists!')
        //// Con el segundo elemento del array y el ternario, describo las dos posibilidades.
    } catch (e) {
        console.log (e)
    }
})

module.exports = router
