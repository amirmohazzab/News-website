import React, {useContext, useEffect} from 'react'
import './Information.css'
import { Link } from 'react-router-dom'
import profileImage from '../../../../assets/images/profile.png'
import {BsFillCapslockFill, BsFillPersonPlusFill, BsChatDots} from 'react-icons/bs'
import { AuthContext } from '../../../context/context'

const Information = () => {

    const {news, comments, users, userId, profile, profilePhoto} = useContext(AuthContext);

    useEffect(()=> {
        profile();
    }, [])


  return (
    <div className='information'>
        <div className='view-web is-flex is-align-items-center is-justify-content-space-between mb-3'>
            <div className='view-webpage'>
                <a href='/' className='button has-background-success has-text-white'> visit website </a>
            </div>
            <div className="view-profile">
                <span> 
                    <Link to={`/edit-profile/${userId}`}>
                        <img src={profilePhoto ? profilePhoto : profileImage} alt="" className='image profile-photo' width="50"/>
                    </Link>
                </span>
            </div>
        </div>
        <div className='info'>
            <div className="info-item">
                <h4> News </h4>
                <span> {news.length} </span>
                <BsFillCapslockFill />
            </div>
            <div className="info-item">
                <h4> Users </h4>
                <span> {users.length} </span>
                <BsFillPersonPlusFill />
            </div>
            <div className="info-item">
                <h4> Comments </h4>
                <span> {comments.length} </span>
                <BsChatDots />
            </div>
        </div>
    </div>
  )
}

export default Information
