import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, filterByType, apiOrDB, orderByName, orderByAttack, getPokemonByName } from '../redux/pokemon.slice'
import { Link } from 'react-router-dom'
import Card from './Card'
import Pages from './Pages'
import styles from './Home.module.css'

export default function Home () {
    const dispatch = useDispatch ()
    const pokemons = useSelector (state => state.pokemon.pokemons)

    // useEffect (() => {
    //     dispatch (getPokemons ())
    // }, [dispatch])

    const [currentPage, setCurrentPage] = useState (1)
    const pokemonsPerPage = 12
    const indexLastPokemon = currentPage * pokemonsPerPage
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage
    const currentPokemons = pokemons.slice (indexFirstPokemon, indexLastPokemon)

    // const [render, setRender] = useState ('')

    const pages = pageNumber => {
        setCurrentPage (pageNumber)
    }

    const [name, setName] = useState ('')

    useEffect (() => {
        dispatch (getPokemons ())
    }, [dispatch])

    //// Handlers a usar.
    function handlerAllPokemons (e) {
        e.preventDefault ()
        dispatch (getPokemons ())
        setCurrentPage (1)
    }
    function handlerFilterType (e) {
        e.preventDefault ()
        dispatch (filterByType (e.target.value))
        setCurrentPage (1)
    }
    function handlerFilterApiOrDB (e) {
        e.preventDefault ()
        dispatch (apiOrDB (e.target.value))
        setCurrentPage (1)
    }
    function handlerSortName (e) {
        e.preventDefault ()
        dispatch (orderByName (e.target.value))
        setCurrentPage (1)
        // setRender (e.target.value)
    }
    function handlerSortAttack (e) {
        e.preventDefault ()
        dispatch (orderByAttack (e.target.value))
        setCurrentPage (1)
        // setRender (e.target.value)
    }
    function handlerInputChange (e) {
        e.preventDefault ()
        setName (e.target.value)
    }
    function handlerFindPokemon (e) {
        e.preventDefault ()
        dispatch (getPokemonByName (name))
        setName ('')
        setCurrentPage (1)
    }

    return (
        <div className={styles.homeDiv}>
            <div className={styles.headerDiv}>
                <div className={styles.findPokemon}>
                    <input type='text' placeholder='Type a name...' value={name} onChange={e => handlerInputChange (e)} className={styles.findInput}/>
                    <button type='submit' onClick={e => handlerFindPokemon (e)} className={styles.findBtn}>Find!</button>
                </div>
                <Link to='/create' className={styles.createLink}>
                    <button className={styles.createBtn}>Create your own Pokemon!</button>
                </Link>
            </div>
            <div className={styles.filtersDiv}>
                <div className={styles.filtersDivision}>
                <p className={styles.filtersText}>You can filter them by...</p>
                <select onChange={e => handlerFilterType (e)} className={styles.filters}>
                    <option value='all'>All</option>
                    <option value='grass'>Grass</option>
                    <option value='poison'>Poison</option>
                    <option value='fire'>Fire</option>
                    <option value='flying'>Flying</option>
                    <option value='water'>Water</option>
                    <option value='bug'>Bug</option>
                    <option value='normal'>Normal</option>
                    <option value='electric'>Electric</option>
                    <option value='ground'>Ground</option>
                    <option value='fairy'>Fairy</option>
                </select>
                <select onChange={e => handlerFilterApiOrDB (e)} className={styles.filters}>
                    <option value='all'>All</option>
                    <option value='api'>Original</option>
                    <option value='db'>Created</option>
                </select>
                </div>
                <div className={styles.filtersDivision}>
                <p className={styles.filtersText}>Or sort them by...</p>
                <select onChange={e => handlerSortName (e)} className={styles.filters}>
                    <option value='' hidden>Default</option>
                    <option value='atoz'>From A to Z</option>
                    <option value='ztoa'>From Z to A</option>
                </select>
                <select onChange={e => handlerSortAttack (e)} className={styles.filters}>
                    <option value='' hidden>Default</option>
                    <option value='asc'>From weakest to strongest</option>
                    <option value='desc'>From strongest to weakest</option>
                </select>
                </div>
            </div>
            <button onClick={e => handlerAllPokemons (e)} className={styles.removeSorts}>Remove sorts</button>
            <div className={styles.cardsDiv}>
                {
                    currentPokemons.length ? currentPokemons.map (p => {
                        return <div key={p.id} className={styles.cardDiv}>
                                   <Link to={`/pokemons/${p.id}`} className={styles.cardLink}><Card name={p.name} img={p.img} types={p.types}/></Link>
                               </div>
                    }) : <p className={styles.waiting}>Wait for a moment please...</p>
                }
            </div>
            <Pages pokemons={pokemons.length} pokemonsPerPage={pokemonsPerPage} pages={pages}/>
        </div>
    )
}
