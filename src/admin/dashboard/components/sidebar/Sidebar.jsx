import React, {useState} from 'react'
import './Sidebar.css'
import logo from '../../../../assets/images/logo.webp'
import { Link } from 'react-router-dom'


const Sidebar = () => {

  const [showNews, setShowNews] = useState(false);



  return (
    <div className='sidebar'>
      <div className="logo mb-5 has-text-centered">
        <img src={logo} alt="" className='is-transparent' style={{width: '200px'}}/>
      </div>
      <ul>
        <li><Link to='/dashboard' style={{display: 'block'}}> Dasboard </Link></li>
        <li>
           <span onClick={()=> setShowNews(!showNews)} style={{display: 'block'}}> News </span>
           {
            showNews && 
            <ul> 
              <li> <Link to='/add-news' style={{display: 'block'}}> Add News </Link> </li>
              <li> <Link to='/view-news' style={{display: 'block'}}> Visite News </Link> </li>
           </ul>
           }
        </li>
        <li><Link to='/category'> Categories </Link></li>
        <li><Link to='/video'> Videos </Link></li>
        <li><Link to='/users'> Users </Link></li>
        <li><Link to='/dashboard'> Comments </Link></li>
        <li><Link to='/exit'> Exit </Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
