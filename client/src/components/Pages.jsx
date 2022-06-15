import React from 'react'
import styles from './Pages.module.css'

export default function Pages ({pokemons, pokemonsPerPage, pages}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil (pokemons / pokemonsPerPage); i++) {
        pageNumbers.push (i)
    }
    return (
        <div>
            <ul className={styles.pages}>
                {
                    pageNumbers.map (number => (
                        <li key={number} className={styles.li}>
                            <button className={styles.btn} onClick={() => pages (number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
