import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreatePokemon from './components/CreatePokemon'
import Detail from './components/Detail'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<CreatePokemon/>}/>
        <Route path='/pokemons/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
