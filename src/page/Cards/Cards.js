import React, { useEffect, useState } from 'react'
import css from "./CardsModule.module.scss"
import {urlEspecies, urlPokemon} from "../../apis/Apis"
import axios from 'axios'
export const Cards = ({card}) => {

//estado

const [itemPokemon, setItemPokemon]=useState({})
const [statsPokemon, setStatsPokemon]=useState({})
const [stats2Pokemon, setStats2Pokemon]=useState({})
const[evolvePokemon,setEvolvePokemon]=useState({})

//useeffect, img
useEffect(()=>{

const dataPokemon=async()=>{
    try {
        const apiDatapokemon= await axios.get(`${urlPokemon}/${card.name}`)
        setItemPokemon(apiDatapokemon.data)
    } catch (error) {
        console.error("este es un error de: ", error)
    }}

dataPokemon()
},[])



//useeffect  id,name,height,weight
useEffect(()=>{
const especiePokemon=async()=>{
try {
    const urlCard= card.url.split("/")
    const apiStatsPokemon= await axios.get(`${urlPokemon}/${urlCard[6]}`)
   setStatsPokemon(apiStatsPokemon.data)
} catch (error) {
    console.error("este es el error especie: ", error)
}}
especiePokemon()
},[card])


useEffect(()=>{
    const especie2Pokemon=async()=>{
    try {
        const urlCard= card.url.split("/")
        const apiStats2Pokemon= await axios.get(`${urlEspecies}/${urlCard[6]}`)
       setStats2Pokemon(apiStats2Pokemon.data)
    } catch (error) {
        console.error("este es el error especie: ", error)
    }}
    especie2Pokemon()
    },[card])
    

                        //stats control
//peso
const weight= statsPokemon?.weight / 10
//name
const name=statsPokemon?.name
//id para 3 numeros
let idPokemon=statsPokemon?.id?.toString()
if(idPokemon?.length==1){
    idPokemon= "00"+idPokemon
}else if(idPokemon?.length==2){
    idPokemon= "0"+idPokemon
}


//altura
const height=statsPokemon?.height *10

//habitat
const habitat=stats2Pokemon?.habitat?.name
//arreglo stats
const stats = statsPokemon?.stats || []; // Asegúrate de que sea un arreglo


  return (
    <div className={css.card}>
       <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt='Picture Pokemon'/>
    
    <div className={`${css.sub_card} bg-${stats2Pokemon?.color?.name}`}>

    <strong className={css.id_card}>{idPokemon}</strong>
    <strong className={css.name_card}>{name}</strong>
    <h4 className={css.altura_card}>{height} cm</h4>
    <h4 className={css.peso_card}>{weight} kg</h4>
    <h4 className={css.habitat_card}>{habitat} :habitat</h4>
    
    <div className={css.div_stats} >
       {stats.map((statpok,index)=>( 
            <h6  className={css.item_stats} key={index}>
        <span  className={css.name}>{statpok.stat.name}</span>
        <progress value={statpok.base_stat} max={110}></progress>
        <span  className={css.numero}>{statpok.base_stat}</span>
        </h6>
        ))}
        
    </div>


    </div>

    </div>
  )
}
