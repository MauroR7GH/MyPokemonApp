import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    allPokemons: [],
    pokemons: [],
    pokemonDetails: [],
    types: [],
    loading: false,
    error: null
}
const pokemonsURL = 'http://localhost:3001/pokemons'
const typesURL = 'http://localhost:3001/types'

export const getPokemons = createAsyncThunk ('pokemon/getPokemons', async () => {
    try {
        const pokemons = await axios.get (pokemonsURL)
        return pokemons.data
    } catch (e) {
        throw Error (e)
    }
})
export const getPokemonByName = createAsyncThunk ('pokemon/getPokemonByName', async (name) => {
    try {
        const pokemonByName = await axios.get (`${pokemonsURL}?name=${name}`)
        return pokemonByName.data
    } catch (e) {
        throw Error (e)
    }
})
export const getPokemonById = createAsyncThunk ('pokemon/getPokemonById', async (id) => {
    try {
        const pokemonById = await axios.get (`${pokemonsURL}/${id}`)
        return pokemonById.data
    } catch (e) {
        throw Error (e)
    }
})
export const createPokemon = createAsyncThunk ('pokemon/createPokemon', async (pokemon) => {
    try {
        const createdPokemon = await axios.post (pokemonsURL, pokemon)
        return createdPokemon.data
    } catch (e) {
        throw Error (e)
    }
})
export const getTypes = createAsyncThunk ('pokemon/getTypes', async () => {
    try {
        const types = await axios.get (typesURL)
        return types.data
    } catch (e) {
        throw Error (e)
    }
})

const pokemonSlice = createSlice ({
    name: 'pokemon',
    initialState,
    reducers: {
        filterByType (state, action) {
            const pokemons = state.allPokemons
            const filterByType = action.payload === 'all' ? pokemons :
                pokemons.filter (p => p.types.includes (action.payload))
            state.pokemons = filterByType
        },
        apiOrDB (state, action) {
            const allPokemons = state.allPokemons
            const apiOrDB = action.payload === 'api' ? allPokemons.filter (p => !p.createdByForm) :
                allPokemons.filter (p => p.createdByForm)
            state.pokemons = action.payload === 'all' ? allPokemons : apiOrDB
        },
        orderByName (state, action) {
            const orderedPokemon = action.payload === 'atoz' ? state.pokemons.sort ((a, b) => {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            }) : state.pokemons.sort ((a, b) => {
                if (a.name < b.name) {
                    return 1
                } else if (a.name > b.name) {
                    return -1
                } else {
                    return 0
                }
            })
            state.pokemons = orderedPokemon
        },
        orderByAttack (state, action) {
            const strongPokemon = action.payload === 'asc' ? state.pokemons.sort ((a, b) => {
                if (a.attack > b.attack) {
                    return 1
                } else if (a.attack < b.attack) {
                    return -1
                } else {
                    return 0
                }
            }) : state.pokemons.sort ((a, b) => {
                if (a.attack < b.attack) {
                    return 1
                } else if (a.attack > b.attack) {
                    return -1
                } else {
                    return 0
                }
            })
            state.pokemons = strongPokemon
        },
        resetPokemonDetails (state, action) {
            state.pokemonDetails = []
        },
    },
    extraReducers: {
        [getPokemons.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [getPokemons.fulfilled]: (state, action) => {
            state.allPokemons = action.payload
            state.pokemons = action.payload
            state.loading = false
        },
        [getPokemons.rejected]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        [getPokemonById.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [getPokemonById.fulfilled]: (state, action) => {
            state.pokemonDetails = action.payload
            state.loading = false
        },
        [getPokemonById.rejected]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        [createPokemon.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [createPokemon.fulfilled]: (state, action) => {
            state.loading = false
            state.error = null
        },
        [createPokemon.rejected]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        [getTypes.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [getTypes.fulfilled]: (state, action) => {
            state.types = action.payload
            state.loading = false
        },
        [getTypes.rejected]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        [getPokemonByName.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [getPokemonByName.fulfilled]: (state, action) => {
            state.pokemons = action.payload
            state.loading = false
        },
        [getPokemonByName.rejected]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        }
    }
})

export const { filterByType, apiOrDB, orderByName, orderByAttack, resetPokemonDetails } = pokemonSlice.actions

export default pokemonSlice.reducer
