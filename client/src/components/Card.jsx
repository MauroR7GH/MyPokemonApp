import React from 'react'
import styles from './Card.module.css'
import Services from '../services/services'
const services = new Services ()


export default function Card ({name, img, types}) {
    return (
        <div className={styles.div}>
            <h3 className={styles.name}>{services.mayusc (name)}</h3>
            <img src={img} alt='This is the Pokemon' className={styles.img}/>
            <p className={styles.types}>{types[0].name ? types.map (t => services.mayusc (t.name) + ' ') : types.map (t => services.mayusc (t) + ' ')}</p>
        </div>
    )
}
