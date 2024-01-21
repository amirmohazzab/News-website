import React, { useContext, useEffect } from 'react'
import Img from '../../../assets/images/1.jpeg'
import Comment from '../Comment/Comment'
import './content.css'
import { HomeContext } from '../../../context/context'
import { useParams } from 'react-router-dom'

const Content = ({data}) => {

    const {getSingleComment, LoadView} = useContext(HomeContext);
    const {id} = useParams();

    useEffect(()=> {
        getSingleComment(id);
        LoadView(id);
    }, [])

  return (
    <div className="content-detail">
        <div className="detail-image">
            <img src={data.url} alt="" />
        </div>
        <div className="detail-title">
            <h1 className='title mt-5'> {data.title} </h1>
        </div>
        <div className="detail-description">
            <p className='description mt-5'>
                {data.desc}  
            </p>
        </div>

        <div className="author">
            <div className="box p-5 mt-6">
                <div className="is-flex is-align-items-center">
                    <div className="is-size-6"> Author: </div>
                    <img src={data?.user?.url}/>
                    <p className='ml-4'>{data?.user?.name}</p>
                </div>
            </div>
        </div>

        <div className="comment">
            <Comment />
        </div>
    </div>
  )
}

export default Content
