import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createPokemon, getTypes } from '../redux/pokemon.slice'
import styles from './CreatePokemon.module.css'
import Services from '../services/services'
const services = new Services ()

export default function CreatePokemon () {
    const dispatch = useDispatch ()
    const navigate = useNavigate ()
    const types = useSelector (state => state.pokemon.types)
    
    const [input, setInput] = useState ({
        name: '',
        health: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        types: []
    })

    const [errors, setErrors] = useState ({})

    useEffect (() => {
        dispatch (getTypes ())
    }, [dispatch])

    //// Handlers a usar.
    function handlerChangesInput (e) {
        setInput ({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors (services.validation ({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handlerSelectTypes (e) {
        if (!input.types.includes (e.target.value) && input.types.length < 2) {
            setInput ({
                ...input,
                types: [...input.types, e.target.value]
            })            
        }
    }
    function handlerDeleteType (type) {
        setInput ({
            ...input,
            types: input.types.filter (t => t !== type)
        })
    }
    function handlerSubmitForm (e) {
        e.preventDefault ()
        if (Object.keys (errors).length === 0 && input.types.length > 0) {
            dispatch (createPokemon (input))
            alert ('You have created your Pokemon!')
            setInput ({
                name: '',
                health: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                img: '',
                types: []
            })
            navigate ('/home')
        } else {
            alert ('Fill out all the form correctly please!')
        }
    }

    let key = 0

    return (
        <div className={styles.createDiv}>
            <Link to='/home'><button className={styles.oneBtn}>Back home</button></Link>
            <div className={styles.formDiv}>
                <h2 className={styles.title}>Wanna create your own Pokemon?</h2>
                <form onSubmit={e => handlerSubmitForm (e)}>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its name?</label>
                        <input className={styles.input} type='text' value={input.name} name='name' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Put a name no longer than ten letters</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its health?</label>
                        <input className={styles.input} type='text' value={input.health} name='health' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Use a value between 1 and 150</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its attack?</label>
                        <input className={styles.input} type='text' value={input.attack} name='attack' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Use a value between 1 and 105</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its defense?</label>
                        <input className={styles.input} type='text' value={input.defense} name='defense' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Use a value between 1 and 115</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its speed?</label>
                        <input className={styles.input} type='text' value={input.speed} name='speed' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Use a value between 1 and 115</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its height?</label>
                        <input className={styles.input} type='text' value={input.height} name='height' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Use a value between 1 and 40</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>What's its weight?</label>
                        <input className={styles.input} type='text' value={input.weight} name='weight' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Use a value between 1 and 1000</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>Send an image!</label>
                        <input className={styles.input} type='text' value={input.img} name='img' onChange={e => handlerChangesInput (e)}/>
                        <p className={styles.description}>Type a valid URL</p>
                    </div>
                    <div className={styles.inputBox}>
                        <label className={styles.label}>Your Pokemon will be..</label>
                        <select className={styles.input} onChange={e => handlerSelectTypes (e)}>
                            <option value='types'>Type</option>
                            {
                                types.map (t => (
                                    <option value={t.name} key={t.id}>{services.mayusc (t.name)}</option>
                                ))
                            }
                        </select>
                        <p className={styles.description}>Choose two types</p>
                    </div>
                    <div>
                        <ul className={styles.types}>
                            {
                                input.types.map (t => (
                                    <div className={styles.eachType} key={key++}>{services.mayusc (t)}<button className={styles.delete} type='button' onClick={() => handlerDeleteType (t)}>X</button></div>
                                ))
                            }
                        </ul>
                    </div>
                    <button className={styles.twoBtn} type='submit'>Create Pokemon!</button>
                </form>
            </div>
        </div>
    )
}
