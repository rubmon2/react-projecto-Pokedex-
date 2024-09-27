import React from 'react'
import logo from "../assets/pokemon.webp"
import css from "./HeaderModule.module.scss"; // Asegúrate de que el nombre sea correcto

export const Header = () => {
  return (
   <nav className={css.header}>
    <div  className={css.header_div}>
       <div  className={css.header_div_logo}>
        <img  src={logo} alt='Logo'/>
       </div>
       <div className={css.header_div_input}>
        <input type='search' placeholder='Buscar Pokemon'/>
       </div>
    </div>
   </nav>

  )
}
