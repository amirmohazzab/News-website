import React from 'react'
import './Main.css'
import Dashboard from '../../Dashboard'

const Main = () => {
  return (
    <Dashboard style={{background: "red"}}>
        <h1 className='is-size-3'> Helo, welcome to admin panel </h1>
        <h3 className='is-size-5'> Hope, good news </h3>
    </Dashboard>
  )
}

export default Main
