import React, { useEffect, useState } from 'react'
import css from "./LayoutModule.module.scss"
import { Header } from '../../components/Header'
import{urlPokemon} from "../../apis/Apis"
import axios from "axios"
import { Cards } from '../Cards/Cards'

export const LayoutHome = () => {

//estados array pokemon y search input
const [arrayPokemon, setArrayPokemon]=useState([])
const [search,setSearch]=useState("")


//limite de las veces q se actualiza card 100 veces, 
//para que aparezcan 100 pokemon por que son 100 numeros
const limit=100

  //useeffect
useEffect(()=>{

    //axios
const getApi= async()=>{
try {

  const apiPokemon= await axios.get(`${urlPokemon}/?offset=0&limit=${limit}`)
  setArrayPokemon(apiPokemon.data.results)
} catch (error) {
  console.error("este es el error: ", error)
}}
getApi()
  },[])

  //fnx obtenersearch Value
  const obtenerSearch=(inputValue)=>{
    setSearch(inputValue.toLowerCase())   
  }

  
//fnx filter y nuevo array
const filterPokemon=arrayPokemon.filter((pokemon)=> 
pokemon.name.toLowerCase().includes(search.toLowerCase())
)




  return (
    <div className={css.layout}>  
        <Header obtenerSearch={obtenerSearch} />
        <div className={css.card_content}>
            {filterPokemon.map((card, index) => {
                return (
                    <Cards  
                        key={index}
                        card={card}
                    />
                );
            })}
        </div>
    </div>
);

}

