import Axios from "axios"
import React, { useState, useRef } from "react"

function CreateNewForm(props) {
  const [name, setName] = useState("")
  const [ip, setip] = useState("")
  const [bay, setBay] = useState("")
  const [file, setFile] = useState("")
  const [gauge, setGauge] = useState("")
  const [maxHeight, setMaxHeight] = useState("")
  const CreatePhotoField = useRef()

  async function submitHandler(e) {
    e.preventDefault()
    const data = new FormData()
    data.append("photo", file)
    data.append("name", name)
    data.append("ip", ip)
    data.append("bay", bay)
    data.append("gauge", gauge)
    data.append("maxHeight", maxHeight)
    setName("")
    setip("")
    setBay("")
    setFile("")
    setGauge("")
    setMaxHeight("")
    CreatePhotoField.current.value = ""
    const newPhoto = await Axios.post("/create-animal", data, { headers: { "Content-Type": "multipart/form-data" } })
    props.setAnimals(prev => prev.concat([newPhoto.data]))
  }

  return (
    <form className="p-3 bg-success bg-opacity-25 mb-5" onSubmit={submitHandler}>
      <div className="mb-2">
        <input ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" className="form-control" />
      </div>
      <div className="mb-2">
        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="name" />
      </div>
      <div className="mb-2">
        <input onChange={e => setip(e.target.value)} value={ip} type="text" className="form-control" placeholder="ip adress" />
      </div>
      <div className="mb-2">
        <input onChange={e => setBay(e.target.value)} value={bay} type="text" className="form-control" placeholder="Bay Number" />
      </div>
      <div className="mb-2">
        <input onChange={e => setGauge(e.target.value)} value={gauge} type="text" className="form-control" placeholder="Gauge" />
      </div>
      <div className="mb-2">
        <input onChange={e => setMaxHeight(e.target.value)} value={gauge} type="text" className="form-control" placeholder="Maximum Height" />
      </div>

      <button  className="btn btn-success">Create New Animal!</button>
    </form>
  )
}

export default CreateNewForm