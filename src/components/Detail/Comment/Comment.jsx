import React from 'react'
import ViewComment from './ViewComment'

const Comment = () => {
  return (
    <>
        <div className="comment-section mt-6 mb-6">
            <form>
                <div className="field">
                    <textarea className='textarea' placeholder='your comment'></textarea>
                </div>
                <div className="columns">
                    <div className="column">
                        <input type="text" className='input' placeholder='your name'/>
                    </div>
                    <div className="column">
                        <input type="text" className='input' placeholder='your email'/>
                    </div>
                </div>
                <div className="field">
                    <input type="text" className="input" placeholder=''/>
                </div>
                <div className="field">
                    <button className='button has-background-danger is-fullwidth mt-5 has-text-white'> Send Comment</button>
                </div>
            </form>
        </div>
        <ViewComment />
    </>
  )
}

export default Comment
