import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import Axios from 'axios'
import CreateNewForm from './CreateNewForm'
import AnimalCard from './AnimalCard'
function Admin() {
    const [animals, setAnimals] = useState([])
    //first one lets us acess the data, and the other let's us change the data

    useEffect(() => {
        async function go(){
          const response = await Axios.get('/api/animals')  
          setAnimals(response.data)
        }
        go()
    },[])
  return (
    <div className='container'>
        <p><a href = '/'>Back to Home</a></p>
        <p></p>
        <CreateNewForm setAnimals={setAnimals} />
        <div className='animal-grid'>
            {animals.map(function(animal){
                return <AnimalCard key = {animal._id} name={animal.name} ip={animal.ip} photo={animal.photo} id={animal._id} bay = {setBay} gauge = {setGauge} setAnimals = {setAnimals}/>
            })}
      </div>
    </div>
  )
}




export default Admin
