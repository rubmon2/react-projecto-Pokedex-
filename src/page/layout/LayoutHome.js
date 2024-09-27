import React, { useEffect, useState } from 'react'
import css from "./LayoutModule.module.scss"
import { Header } from '../../components/Header'
import{urlPokemon} from "../../apis/Apis"
import axios from "axios"
import { Cards } from '../Cards/Cards'

export const LayoutHome = () => {

//estado
const [arrayPokemon, setArrayPokemon]=useState([])

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

  return (
    <div className={css.layout}>  
        <Header />
        <div className={css.card_content}>
            {arrayPokemon.map((card, index) => {
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

