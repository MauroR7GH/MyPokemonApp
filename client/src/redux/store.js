// import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import rootReducer from '../reducer/index'

// const store = createStore (rootReducer, composeWithDevTools (applyMiddleware (thunk)))

// export default store

////

import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemon.slice'

const store = configureStore ({
    reducer: {
        pokemon: pokemonReducer
    }
})

export default store
