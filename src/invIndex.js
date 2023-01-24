import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import Admin from './components/Admin'
import Axios from 'axios'
import AnimalCard from './components/AnimalCard'
import Inventory from './components/Inventory'
import CreateNewForm from './components/CreateNewForm'
function Inv() {
    
    
    
  return (
    <div className='container'>
        <p><a href = '/'>Back to Home</a></p>
        
        
      
    </div>
  )
}



const root = createRoot(document.querySelector('#inventory'))
root.render(<Inv />)

