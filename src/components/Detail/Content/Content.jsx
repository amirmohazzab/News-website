import React from 'react'
import Img from '../../../assets/images/1.jpeg'
import Comment from '../Comment/Comment'
import './content.css'

const Content = () => {
  return (
    <div className="content-detail">
        <div className="detail-image">
            <img src={Img} alt="" />
        </div>
        <div className="detail-title">
            <h1 className='title mt-5'> title news test</h1>
        </div>
        <div className="detail-description">
            <p className='description mt-5'>
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum  
            </p>
        </div>
        <div className="comment">
            <Comment />
        </div>
    </div>
  )
}

export default Content
