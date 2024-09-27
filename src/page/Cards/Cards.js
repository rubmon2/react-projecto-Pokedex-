import React, { useEffect, useState } from 'react'
import css from "./CardsModule.module.scss"
import {urlEspecies, urlEvolvePokemon, urlPokemon} from "../../apis/Apis"
import axios from 'axios'
export const Cards = ({card}) => {

//estado

const [itemPokemon, setItemPokemon]=useState({})
const [statsPokemon, setStatsPokemon]=useState({})
const[evolutionPokemon,setEvoluPokemon]=useState([])

//useeffect, img y datos del pokemon, sacados desde card que tiene el nombre y url de cada pokemon 
//revisarlo con console.log(card)
useEffect(()=>{
    
const dataPokemon=async()=>{
    try {
        const apiDatapokemon= await axios.get(`${urlPokemon}/${card.name}`)
        setItemPokemon(apiDatapokemon.data)
    } catch (error) {
        console.error("este es un error de: ", error)
    }}

dataPokemon()
},[card])


//todos los stats de los pokemon
useEffect(()=>{
    const getStatsPokemon=async()=>{
    try {
        const urlCard= card.url.split("/")
        const apiStatsPokemon= await axios.get(`${urlEspecies}/${urlCard[6]}`)
       setStatsPokemon(apiStatsPokemon.data)
    } catch (error) {
        console.error("este es el error especie: ", error)
    }}
    getStatsPokemon()

    },[card])



 //evolve
useEffect(()=>{
//funcion url para traer img de pokemon evolucion
const getEvolveImg=async (id) => {
    try {
        const response= await axios.get(`${urlPokemon}/${id}`)
      return response?.data?.sprites?.other["official-artwork"]?.front_default
    } catch (error) {
        console.error("Error desde getEvolveimg: ",error)
    }  
}
console.log(statsPokemon)
//tiene evolucione el pokemon? imprimir su img (inicial)
    if(statsPokemon?.evolution_chain){
  
        const obtenerevolucion= async()=>{
             const arrayEvoluciones=[]
             const url=statsPokemon?.evolution_chain?.url.split("/")
          try {

            //axios
             const apiEvolve= await axios.get(`${urlEvolvePokemon}/${url[6]}`)
             const url2= apiEvolve.data?.chain?.species?.url?.split("/")
             const imgEvolve= await getEvolveImg(url2[6])

            //push
            arrayEvoluciones.push({
                img:imgEvolve,
                name:apiEvolve.data?.chain?.species?.name
            }) 

//tiene evolucione el pokemon? imprimir la  img de la evolucion (1ra)
            if(apiEvolve.data?.chain?.evolves_to?.length != 0){
                //split url 
                const data2=apiEvolve.data?.chain.evolves_to[0]?.species
                const idData= data2.url.split("/")
                const imgEvolve2= await getEvolveImg(idData[6])
    
                arrayEvoluciones.push({
                    img:imgEvolve2,
                    name:data2.name}) 

            }

 //tiene otra evolcion? imprimir su img (3ra img, 2 evolucion)             
            if(apiEvolve.data?.chain?.evolves_to[0]?.evolves_to[0]){
                const data3=apiEvolve.data?.chain.evolves_to[0]?.evolves_to[0]?.species

    
                const idData2= data3.url.split("/")
                 const imgEvolve3= await getEvolveImg(idData2[6])
    
                arrayEvoluciones.push({
                    img:imgEvolve3,
                    name:data3.name }) 
            }

            setEvoluPokemon(arrayEvoluciones)  
          } catch (error) {
             console.error("este es un error de obtoneerevoluciones",error)
          }
  
 } 
        
    //llamar a funcion evoluciones
        obtenerevolucion()
     } 
//dependencia
},[statsPokemon])



                                            //stats control
                    //peso
const weight= itemPokemon?.weight / 10
                    //name
const name=itemPokemon?.name
                    //id para 3 numeros
let idPokemon=itemPokemon?.id?.toString()
if(idPokemon?.length==1){
    idPokemon= "00"+idPokemon
}else if(idPokemon?.length==2){
    idPokemon= "0"+idPokemon
}

                    //altura
const height=itemPokemon?.height *10

                    //habitat
const habitat=statsPokemon?.habitat?.name
                    //arreglo stats
const stats = itemPokemon?.stats || []; 


                                





// console.log(`${statsPokemon.name} y su id: ${statsPokemon.id}`, statsPokemon.evolution_chain)






  return (
    <div className={css.card}>
       <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt='Picture Pokemon'/>
    
    <div className={`${css.sub_card} bg-${statsPokemon?.color?.name}`}>

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
           <div className={css.div_evo}>
                {evolutionPokemon.map((evolutions, index) => (
                    <div className={css.item_evo} key={index}>
                    <img className={css.img_evo} src={evolutions.img} alt={evolutions.name} />
                    <p className={css.name_evo}>{evolutions.name}</p>
                    </div>
                ))}
            </div>


    </div>

    </div>
  )
}
