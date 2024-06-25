import { useState } from "react"
import React from 'react'

const MovieForm = () => {
    const[title,setTitle] =useState("")
    const [date,setDate] = useState("")
    const [about,setAbout]=useState("")
    const submitHandler = (e)=>{
             e.preventDefault()
             const data = {
                title:title,
                date:date,
                about:about
             }
             console.log("data",data)
             
    }
    const titleHandler = (e)=>{
        setTitle(e.target.value)
    }
    const dateHandler = (e)=>{
        setDate(e.target.value)
    }
    const aboutHandler = (e)=>{
        setAbout(e.target.value)
    }
  return (
    <form onSubmit={submitHandler}>
      <label>title</label>
     <input type="text" value={title} onChange={titleHandler} />
      <br/>
      <label>release date</label>
      <input type='date' value={date} onChange={dateHandler}/>
      <br/>
      <label>about</label>
      <input type='text' value={about} onChange={aboutHandler}/>
      <br/>
      <button  type='submit'>Add</button>
    </form>
  )
}

export default MovieForm