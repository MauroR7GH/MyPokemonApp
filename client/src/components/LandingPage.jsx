import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage () {
    return (
        <div className={styles.landing}>
            <h1 className={styles.h1}>Welcome Pokemon trainer!</h1>
            <Link to='/home'>
                <button className={styles.btn}>Enter!</button>
            </Link>
        </div>
    )
}
