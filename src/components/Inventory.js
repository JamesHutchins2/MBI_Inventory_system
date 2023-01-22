import React, {useState, useEffect} from 'react'
import {createRoot} from 'react-dom/client'
import Axios from 'axios'

import InventoryCard from './InventoryCard'
import CreateInvForm from './CreateInvForm'
function Inventory() {
    const [inventorys, setInventorys] = useState([])
    //first one lets us acess the data, and the other let's us change the data

    useEffect(() => {
        async function update(){
            //update each item in inventory
            //get the inventory
            const response = await Axios.get('/api/inventory')
            //loop through each item in inventory
            for(let i = 0; i < response.data.length; i++){
                let item = response.data[i]
                //get the ip value
                let ip = item.ip
                //get the gauge value
                let gauge = item.gauge
                //request the data from the IP
                let height = await Axios.get('http://' + ip )

                item.stock = (height.data / gauge)

        }
        async function go(){
          const response = await Axios.get('/api/inventory')  
          setInventorys(response.data)
        }
        go()
    },[])
  return (
    <div className='container'>
        <h1>Inventory Information</h1>
        <CreateInvForm setInventorys={setInventorys} />
        <div className='animal-grid'>
            {inventorys.map(function(inventory){
                return <InventoryCard key = {inventory._id} name={invetory.name} bay={inventory.bay} photo={animal.photo} id={inventory._id} gauge ={inventory.gauge} ip={inventory.ip} />
            })}
      </div>
        

    </div>

  )
}




export default Inventory
