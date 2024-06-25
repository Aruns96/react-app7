import classes from "./MovieForm.module.css"
import { useState } from "react"
import React from 'react'

const MovieForm = (props) => {
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
             props.onAddMovie(data)
             
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
         <div className={classes.control}>
      <label>title</label>
     <input type="text" value={title} onChange={titleHandler} />
     </div>
     <div className={classes.control}>
      <label>release date</label>
      <input type='date' value={date} onChange={dateHandler}/>
      </div>
      <div className={classes.control}>
      <label>opening text</label>
      <input type='text' value={about} onChange={aboutHandler}/>
      </div>
      <button  type='submit'>Add</button>
    </form>
     
  )
}

export default MovieForm