import React from 'react'
import { useParams } from 'react-router-dom'
import {FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from 'react-share'
import newsCard from '../../../assets/images/news_card.jpg'
import './rightside.css'

const RightSide = () => {

  const {id} = useParams();
  const shareUrl = `https://localhost:3000/detail/${id}`
  return (
    <div className="right-side">
      <div className="social-media has-background-white p-5">
        <h1 className='is-size-6 has-text-weight-bold mb-4'> Share</h1>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round={true} size={40}/>
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} className='ml-3'>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
      </div>
      <div className="detail-ads has-text-centered mt-5">
        <img src={newsCard} alt="" width="250px" />

      </div>
    </div>
  )
}

export default RightSide
