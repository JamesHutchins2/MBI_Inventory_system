import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'

import Inventory from './components/Inventory'
function App() {
    
  return (
    <div className='container'>
        <Inventory />
    </div>
  )
}



const root = createRoot(document.querySelector('#app'))
root.render(<App />)

