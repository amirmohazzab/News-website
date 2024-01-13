import React, {useState} from 'react'
import './Sidebar.css'
import logo from '../../../../assets/images/logo.webp'
import { Link } from 'react-router-dom'


const Sidebar = () => {

  const [showNews, setShowNews] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [showVideo, setShowVideo] = useState(false);



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
              <li> <Link to='/view-news' style={{display: 'block'}}> Show News </Link> </li>
           </ul>
           }
        </li>
        <li>
        <span onClick={()=> setShowCats(!showCats)} style={{display: 'block'}}> Category </span>
           {
            showCats && 
            <ul> 
              <li> <Link to='/add-category' style={{display: 'block'}}> Add Category </Link> </li>
              <li> <Link to='/view-category' style={{display: 'block'}}> Show Category </Link> </li>
           </ul>
           }
        </li>
        <li>
        <span onClick={()=> setShowVideo(!showVideo)} style={{display: 'block'}}> Video </span>
           {
            showVideo && 
            <ul> 
              <li> <Link to='/add-video' style={{display: 'block'}}> Add Video </Link> </li>
              <li> <Link to='/view-video' style={{display: 'block'}}> Show Video </Link> </li>
           </ul>
           }
        </li>

        <li><Link to='/users'> Users </Link></li>
        <li><Link to='/dashboard'> Comments </Link></li>
        <li><Link to='/exit'> Exit </Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
