import Axios from "axios"
import React, { useState, useRef } from "react"

function CreateNewForm(props) {
  const [name, setName] = useState("")
  const [species, setSpecies] = useState("")
  const [bay, setBay] = useState("")
  const [file, setFile] = useState("")
  const CreatePhotoField = useRef()

  async function submitHandler(e) {
    e.preventDefault()
    const data = new FormData()
    data.append("photo", file)
    data.append("name", name)
    data.append("species", species)
    data.append("bay", bay)
    setName("")
    setSpecies("")
    setBay("")
    setFile("")
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
        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Animal name" />
      </div>
      <div className="mb-2">
        <input onChange={e => setSpecies(e.target.value)} value={species} type="text" className="form-control" placeholder="Species" />
      </div>
      <div className="mb-2">
        <input onChange={e => setBay(e.target.value)} value={bay} type="text" className="form-control" placeholder="Bay Number" />
      </div>

      <button  className="btn btn-success">Create New Animal!</button>
    </form>
  )
}

export default CreateNewForm