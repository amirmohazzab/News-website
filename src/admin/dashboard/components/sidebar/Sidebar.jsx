import React, {useState, useContext} from 'react'
import './Sidebar.css'
import logo from '../../../../assets/images/logo.jpg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/context'
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";


const Sidebar = () => {

  const [showNews, setShowNews] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const {logout, admin} = useContext(AuthContext)



  return (
    <div className='sidebar'>
      <div className="logo mb-5 has-text-centered">
        <img src={logo} alt="" className='is-transparent' style={{width: '200px'}}/>
      </div>
      <ul>
        <li >
          <Link to='/dashboard' style={{display: 'block'}}> 
            <div style={{display: 'flex', alignItems: 'center'}}> <MdDashboard style={{fontSize: 30}} /> <p style={{marginLeft: 10}}> Dashboard </p> </div> 
          </Link>
        </li>
        
        <li>
           <span onClick={()=> setShowNews(!showNews)} style={{display: 'block'}}> 
              <div style={{display: 'flex', alignItems: 'center'}}> <FaRegNewspaper style={{fontSize: 30, display: 'block'}} />  <p style={{marginLeft: 10}}> News </p> </div>
           </span>
           {
            showNews && 
            <ul> 
              <li> 
                <Link to='/add-news' style={{display: 'block'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}> <FaPlus style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Add News </p> </div>
                </Link> 
              </li>
              <li> 
                <Link to='/view-news' style={{display: 'block'}}> 
                  <div style={{display: 'flex', alignItems: 'center'}}> <FaEye style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Show News </p> </div>
                </Link> 
              </li>
           </ul>
           }
        </li>

        {
          admin ? (
            <>
              <li>
                <span onClick={()=> setShowCats(!showCats)} style={{display: 'block'}}> 
                  <div style={{display: 'flex', alignItems: 'center'}}> <MdCategory style={{fontSize: 30, display: 'block'}} />  <p style={{marginLeft: 10}}> Category </p> </div>
                </span>
           {
            showCats && 
            <ul> 
              <li> 
                <Link to='/add-category' style={{display: 'block'}}> 
                  <div style={{display: 'flex', alignItems: 'center'}}> <FaPlus style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Add Category </p> </div>
                </Link> 
              </li>
              <li> 
                <Link to='/view-category' style={{display: 'block'}}> 
                  <div style={{display: 'flex', alignItems: 'center'}}> <FaEye style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Show Categories </p> </div>
                </Link> 
              </li>
           </ul>
           }
        </li>
        <li>
          <span onClick={()=> setShowVideo(!showVideo)} style={{display: 'block'}}>
            <div style={{display: 'flex', alignItems: 'center'}}> <FaVideo style={{fontSize: 27, display: 'block'}} />  <p style={{marginLeft: 10}}> Video </p> </div> 
          </span>
           {
            showVideo && 
            <ul> 
              <li> 
                <Link to='/add-video' style={{display: 'block'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}> <FaPlus style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Add Video </p> </div>
                </Link> 
              </li>
              <li> 
                <Link to='/view-video' style={{display: 'block'}}> 
                  <div style={{display: 'flex', alignItems: 'center'}}> <FaEye style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Show Videos </p> </div>
                </Link> 
              </li>
           </ul>
           }
        </li>
        <li>
          <span onClick={()=> setShowUsers(!showUsers)} style={{display: 'block'}}>
            <div style={{display: 'flex', alignItems: 'center'}}> <FaUser style={{fontSize: 27, display: 'block'}} />  <p style={{marginLeft: 10}}> Users </p> </div> 
          </span>
           {
            showUsers && 
            <ul> 
              <li> 
                <Link to='/add-user' style={{display: 'block'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}> <FaPlus style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Add User </p> </div>
                </Link> 
              </li>
              <li> 
                <Link to='/view-user' style={{display: 'block'}}> 
                <div style={{display: 'flex', alignItems: 'center'}}> <FaEye style={{fontSize: 25, display: 'block'}} />  <p style={{marginLeft: 10}}> Show Users </p> </div>
                </Link> 
              </li>
           </ul>
           }
        </li>
            </>
          ) : (
            ""
          )
        }

        <li>
          <Link to='/comment' style={{display: 'block'}}>
            <div style={{display: 'flex', alignItems: 'center'}}> <FaRegCommentDots style={{fontSize: 27, display: 'block'}} />   <p style={{marginLeft: 10}}> Comments </p> </div>
          </Link>
        </li>
        <li> 
          <span style={{display: 'block'}} onClick={logout}> <div style={{display: 'flex', alignItems: 'center'}}> <MdExitToApp style={{fontSize: 30, display: 'block'}} />   <p style={{marginLeft: 10}}> Exit </p> </div> </span> 
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
