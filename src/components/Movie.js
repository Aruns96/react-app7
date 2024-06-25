import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
   
   
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.date}</h3>
      <p>{props.desc}</p>
      <button onClick={()=>props.onDelete(props.id)}>delete</button>
    </li>
  );
};

export default Movie;
