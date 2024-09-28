import React from 'react'
import logo from "../assets/pokemon.webp"
import css from "./HeaderModule.module.scss"; // Asegúrate de que el nombre sea correcto

export const Header = ({obtenerSearch}) => {

//usar props fnx, mas onchange
const onInputChange=(event)=>{
   const inputValue=event.target.value
 obtenerSearch(inputValue)
}


  return (
   <nav className={css.header}>
    <div  className={css.header_div}>
       <div  className={css.header_div_logo}>
        <img  src={logo} alt='Logo'/>
       </div>
       <div className={css.header_div_input}>
        <input type='search' placeholder='Buscar Pokemon' onChange={onInputChange}/>
       </div>
    </div>
   </nav>

  )
}
