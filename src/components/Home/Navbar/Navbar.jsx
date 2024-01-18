import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <header className="has-background-danger py-3 my-2">
        <div className="container">
            <div className="nav">
                <ul className='is-flex nav-ul'>
                    <li> <Link to='/'> Home </Link></li>
                    <li> <Link to='/about'> About </Link></li>
                    <li> <Link to='/contact'> Contact us </Link></li>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Navbar
