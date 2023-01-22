import Axios from "axios"
import React, { useState, useRef } from "react"

function CreateInvForm(props) {
  const [name, setName] = useState("")
  const [bay, setBay] = useState("")
  const [ip, setIp] = useState("")
  const [gauge, setGauge] = useState("")
  const [file, setFile] = useState("")
  const CreatePhotoField = useRef()

  async function submitHandler(e) {
    e.preventDefault()
    const data = new FormData()
    data.append("photo", file)
    data.append("name", name)
    data.append("bay", bay)
    data.append("gauge", gauge)
    data.append("ip", ip)

    setName("")
    setBay("")
    setGauge("")
    setIp("")
    setFile("")

    CreatePhotoField.current.value = ""
    const newPhoto = await Axios.post("/create-inventory", data, { headers: { "Content-Type": "multipart/form-data" } })
    props.setInventory(prev => prev.concat([newPhoto.data]))
  }

  return (
    <form className="p-3 bg-success bg-opacity-25 mb-5" onSubmit={submitHandler}>
      <div className="mb-2">
        <input ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" className="form-control" />
      </div>
      <div className="mb-2">
        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Item Name" />
      </div>
      <div className="mb-2">
        <input onChange={e => setBay(e.target.value)} value={bay} type="text" className="form-control" placeholder="Bay Number" />
      </div>
      <div className="mb-2">
        <input onChange={e => setIp(e.target.value)} value={ip} type="text" className="form-control" placeholder="Ip Adress" />
      </div>
      <div className="mb-2">
        <input onChange={e => setGauge(e.target.value)} value={gauge} type="text" className="form-control" placeholder="Gauge" />
      </div>

      <button className="btn btn-success">Create new Stock</button>
    </form>
  )
}

export default CreateInvForm