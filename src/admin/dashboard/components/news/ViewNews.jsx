import React, {useContext, useEffect, useState} from 'react'
import Dashboard from '../../Dashboard'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/context'
import './ViewNews.css'

const ViewNews = () => {

  const {handleNews, news, deleteNews} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  }
  

  useEffect(()=> {
    handleNews()
  }, [])

  
  return (
    <Dashboard>
        <div className='is-flex is-justify-content-end' >
          <Link to='/add-news' className='button px-6 is-success mb-6'>
            Add news
          </Link>
        </div>

        <table className='table is-fullwidth'>
          <thead className='is-fullwidth'>
            <tr>
              <th> No </th>
              <th> Title </th>
              <th> Image </th>
              <th> Author </th>
              <th> Edit </th>
              <th> Delete </th>
            </tr>
          </thead>

          <tbody>
            {
              news ?
              news.map((item, index)=>(
                <tr key={item.id}>
                  <td> {index+1} </td>
                  <td> {item.title} </td>
                  <td> 
                    <img src={item.url} width="100" alt="" />
                  </td>
                  <td> {item?.user?.name} </td>
                  <td> 
                    <Link state={item} to={`/edit-news/${item.id}`} className='button is-info'> Edit </Link>
                  </td>
                  <td> 
                    <button onClick={() => {setShowModal(true); handleId(item.id)}} className='button is-danger'>
                      Delete
                    </button>
                  </td>
                </tr>
              )) : null
            }
          </tbody>
        </table>

        {
          showModal ?
          <div className="modal-overlay">
            <div className="modal-news">
              <h1 className='has-text-centered'> Are you sure to delete this item? </h1>
              <div className='is-flex is-justify-content-center'>
                <button className='button is-danger mr-3' onClick={() => {deleteNews(id); setShowModal(false)}}> Yes </button>
                <button className='button is-success' onClick={()=> setShowModal(false)}> Cancel </button>
              </div>
            </div>
          </div>
        : ""
        }
    </Dashboard>
   
  )
}

export default ViewNews
