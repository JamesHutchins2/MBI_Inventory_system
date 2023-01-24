import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import Admin from './components/Admin'
import Axios from 'axios'
import AnimalCard from './components/AnimalCard'
import Inventory from './components/Inventory'
import CreateNewForm from './components/CreateNewForm'
function App() {
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
                return <AnimalCard key = {animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} setAnimals = {setAnimals}/>
            })}
      </div>
    </div>
  )
}



const root = createRoot(document.querySelector('#app'))
root.render(<App />)

