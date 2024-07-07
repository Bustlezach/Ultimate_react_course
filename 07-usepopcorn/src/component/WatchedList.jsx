import React from 'react'
import Watched from './Watched'

function WatchedList({watched}) {
  return (
    <ul className="list">
    {watched.map((movie) => (
      <Watched key={movie.imdbID} movie={movie}/>
    ))}
  </ul>
  )
}

export default WatchedList