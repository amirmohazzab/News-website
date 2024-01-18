import React from 'react'
import vid from '../../../assets/images/newsvideo.mp4'
import img from '../../../assets/images/1.jpeg'
import './homewrapper.css'

const HomeWrapper = () => {
  return (
    <div className="wrapper">
        <div className="container">
            <div className="columns is-flex-widescreen is-block-tablet is-align-items-start">
                <div className="column is-one-quarter-widescreen is-full-desktop">
                    <div className="right-side-post">
                        <div className="right-side-top">
                            <div className="right-side-img">
                                <div className="overlay"></div>
                                <img src={img} alt="" />
                            </div>
                            <div className="post-info">
                                <div className="post-cat">
                                    <span> post </span>
                                </div>
                                <div className="post-title"> post title </div>
                                <div className="post-date">16/6/91</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-three-quarters-widescreen is-full-tablet">
                    <div className="post-left-side">
                        <video src={vid} controls width="100%" height="100%"></video>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeWrapper
