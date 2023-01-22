import Axios from "axios"
import React, { useState } from "react"
import Inventory from "./inventory"

function InventoryCard(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState("")
  const [file, setFile] = useState()
  const [draftBay, setDraftBay] = useState("")
  const [draftIp, setDraftIp] = useState("")
  const [draftGauge, setDraftGauge] = useState("")


  async function submitHandler(e) {
    e.preventDefault()
    setIsEditing(false)
    props.setInventorys(prev =>
      prev.map(function (inventory) {
        if (inventory._id == props.id) {
          return { ...inventory, name: draftName, bay: draftBay, ip: draftIp, gauge: draftGauge }
        }
        return inventory
      })
    )
    const data = new FormData()
    if (file) {
      data.append("photo", file)
    }
    data.append("_id", props.id)
    data.append("name", draftName)
    data.append("bay", draftBay)
    data.append("ip", draftIp)
    data.append("gauge", draftGauge)

    const newPhoto = await Axios.post("/update-inventory", data, { headers: { "Content-Type": "multipart/form-data" } })
    if (newPhoto.data) {
      props.setInventorys(prev => {
        return prev.map(function (inventory) {
          if (inventory._id == props.id) {
            return { ...inventory, photo: newPhoto.data }
          }
          return inventory
        })
      })
    }
  }

  return (
    <div className="card">
      <div className="our-card-top">
        {isEditing && (
          <div className="our-custom-input">
            <div className="our-custom-input-interior">
              <input onChange={e => setFile(e.target.files[0])} className="form-control form-control-sm" type="file" />
            </div>
          </div>
        )}
        <img src={props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"} className="card-img-top" alt={`${props.bay} contains ${props.name}`} />
      </div>
      <div className="card-body">
        {!isEditing && (
          <>
            <h4>{props.name}</h4>
            <p className="text-muted small">{props.bay}</p>
            {!props.readOnly && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setDraftName(props.name)
                    setDraftBay(props.bay)
                    setDraftIp(props.ip)
                    setDraftGauge(props.gauge)
                    setFile("")
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={async () => {
                    const test = Axios.delete(`/inventory/${props.id}`)
                    props.setInventorys(prev => {
                      return prev.filter(inventory => {
                        return inventory._id != props.id
                      })
                    })
                  }}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
        {isEditing && (
          <form onSubmit={submitHandler}>
            <div className="mb-1">
              <input autoFocus onChange={e => setDraftName(e.target.value)} type="text" className="form-control form-control-sm" value={draftName} />
            </div>
            <div className="mb-2">
              <input onChange={e => setDraftBay(e.target.value)} type="text" className="form-control form-control-sm" value={draftBay} />
            </div>
            <div className="mb-3">
              <input onChange={e => setDraftIp(e.target.value)} type="text" className="form-control form-control-sm" value={draftIp} />
            </div>
            <div className="mb-4">
              <input onChange={e => setDraftGauge(e.target.value)} type="text" className="form-control form-control-sm" value={draftGauge} />
            </div>
           
            <button className="btn btn-sm btn-success">Save</button>{" "}
            <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-secondary">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default InventoryCard