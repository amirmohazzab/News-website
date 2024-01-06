import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/context'

const Dashboard = () => {

  const {getAllUsers} = useContext(AuthContext)
  return (
    <>
    <div>
        dashboard
    </div>
    <button onClick={getAllUsers}> users </button>
    </>
    
  )
}

export default Dashboard
