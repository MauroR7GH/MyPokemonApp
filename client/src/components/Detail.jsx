import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getPokemonById, resetPokemonDetails } from '../redux/pokemon.slice'
import styles from './Detail.module.css'
import Services from '../services/services'
const services = new Services ()

export default function Detail () {
    const {id} = useParams ()
    const dispatch = useDispatch ()
    const pokemonDetails = useSelector (state => state.pokemon.pokemonDetails)

    useEffect (() => {
        dispatch (getPokemonById (id))
        dispatch (resetPokemonDetails ())
    }, [dispatch, id])

    return (
        <div className={styles.detailDiv}>
            <Link to='/home'>
                <button className={styles.btn}>Back home</button>
            </Link>
            {
                pokemonDetails.length > 0 ?
                    <div>
                        <div className={styles.oneData}>
                            <h1 className={styles.name}>{services.mayusc (pokemonDetails[0].name)}</h1>
                            <img className={styles.img} src={pokemonDetails[0].img} alt='This is the Pokemon'/>
                        </div>
                        <div className={styles.twoData}>
                            <p>Health: {pokemonDetails[0].health} pts.</p>
                            <p>Attack: {pokemonDetails[0].attack} pts.</p>
                            <p>Defense: {pokemonDetails[0].defense} pts.</p>
                            <p>Speed: {pokemonDetails[0].speed} pts.</p>
                            <p>Height: {pokemonDetails[0].height} ft.</p>
                            <p>Weight: {pokemonDetails[0].weight} lb.</p>
                            <h4 className={styles.name}>Type: {!pokemonDetails[0].createdByForm ? pokemonDetails[0].types.map (t => services.mayusc (t) + ' ') :
                                pokemonDetails[0].types.map (t => services.mayusc (t.name) + ' ')}</h4>
                        </div>
                    </div> : <p className={styles.waiting}>Wait a moment please...</p>
            }
        </div>
    )
}
