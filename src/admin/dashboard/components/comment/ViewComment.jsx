import React, {useContext, useEffect, useState} from 'react'
import Dashboard from '../../Dashboard'
import { AuthContext } from '../../../context/context'
import './ViewComment.css'
import { paginate } from '../../../../utils/paginate'
import Pagination from '../../Pagination'

const ViewComment = () => {

    const {getAllComments, comments, deleteComment, activeComment, inactiveComment, 
      currentPage, perPage, handlePageChange} = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState("");
    
    const handleId = (id) => {
      setId(id);
    }

    let commentsData = paginate(comments, currentPage, perPage);

    useEffect(()=> {
        getAllComments()
    }, [])

  return (
    <Dashboard>
    <table className='table is-fullwidth'>
      <thead className='is-fullwidth'>
        <tr>
          <th> No </th>
          <th> Subject </th>
          <th> Description </th>
          <th> Email </th>
          <th> State </th>
          <th> Delete </th>
        </tr>
      </thead>

      <tbody>
        {
            commentsData?.map((comment, index) => (
                <tr key={comment.id}>
                    <td> {index+1} </td>
                    <td> {comment.subject} </td>
                    <td> {comment.description} </td>
                    <td> {comment.email} </td>
                    <td> 
                        {
                            comment.isActive ? (
                                <button className='button is-success' onClick={() => inactiveComment(comment.id)}> Active </button>
                            ) : (
                                <button className='button is-warning' onClick={() => activeComment(comment.id)}> Inactive </button>
                            )
                        }
                    </td>
                    <td> 
                        <button className='button is-danger' onClick={() => {setShowModal(true); handleId(comment.id)}}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        }
      </tbody>
    </table>

    {
          showModal ?
          <div className="modal-overlay">
            <div className="modal-category">
              <h1 className='has-text-centered'> Are you sure to delete this item? </h1>
              <div className='is-flex is-justify-content-center'>
                <button className='button is-danger mr-3' onClick={() => {deleteComment(id); setShowModal(false)}}> Yes </button>
                <button className='button is-success' onClick={()=> setShowModal(false)}> Cancel </button>
              </div>
            </div>
          </div>
        : ""
      }

    <Pagination
      totalCourse={comments.length}
      currentPage={currentPage}
      perPage={perPage}
      onPageChange={handlePageChange}
    />
      
    </Dashboard>
  )
}

export default ViewComment
