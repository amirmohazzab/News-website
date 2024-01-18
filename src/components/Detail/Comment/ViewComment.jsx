import React from 'react'
import {BsArrowReturnRight} from 'react-icons/bs'

const ViewComment = () => {
  return (
    <div className='comment-view mt-5'>
      <div className="box">
        <div className="name is-size-5"> Amir </div>
        <div className="subject has-text-grey">
            <div className='pr-2 mt-2'>
                <BsArrowReturnRight />
            </div>
            <span className='pr-4 pt-1 is-size-6'> test subject </span>
        </div>
        <div className="desc pt-4">
                <p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p>
            </div>
      </div>
      <div className="box">
        <div className="name is-size-5"> Amir </div>
        <div className="subject has-text-grey">
            <div className='pr-2 mt-2'>
                <BsArrowReturnRight />
            </div>
            <span className='pr-4 pt-1 is-size-6'> test subject </span>
        </div>
        <div className="desc pt-4">
                <p> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p>
            </div>
      </div>
    </div>
  )
}

export default ViewComment
