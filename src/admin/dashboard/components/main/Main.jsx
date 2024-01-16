import React, { useContext } from 'react'
import './Main.css'
import Dashboard from '../../Dashboard'
import { AuthContext } from '../../../context/context'

const Main = () => {

  const {profileName} = useContext(AuthContext);

  return (
    <Dashboard style={{background: "red"}}>
        <h1 className='is-size-3'> Helo {profileName}, welcome to Admin Panel </h1>
        <h3 className='is-size-5'> Hope, good news </h3>
    </Dashboard>
  )
}

export default Main
