import React, {useContext, useEffect, useState} from 'react'
import Dashboard from './../../Dashboard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/context';
import { paginate } from '../../../../utils/paginate';
import Pagination from '../../Pagination';
import './ViewUsers.css'

const ViewUsers = () => {

  const {users, getAllUsers, deleteUser, currentPage, perPage, handlePageChange} = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
      setId(id);
  }

  let usersData = paginate(users, currentPage, perPage)

  useEffect(()=>{
    getAllUsers();
  },[])


  return (
    <Dashboard>
        <div className='is-flex is-justify-content-end' >
          <Link to='/add-user' className='button px-6 is-success mb-4'>
            Add user
          </Link>
        </div>

        <table className='table is-fullwidth'>
          <thead className='is-fullwidth'>
            <tr>
              <th> No </th>
              <th> Name </th>
              <th> Email </th>
              <th> Role </th>
              <th> Edit </th>
              <th> Delete </th>
            </tr>
          </thead>

          <tbody>
            {
              usersData?.map((user, index)=>(
                <tr key={user.id}>
                  <td> {index+1} </td>
                  <td> {user.name} </td>
                  <td> {user.email} </td>
                  <td> {user.isAdmin ? "Admin" : "Author"} </td>
                  <td>
                    <Link state={user} to={`/edit-user/${user.id}`} className='button is-info'>
                      Edit
                    </Link>
                  </td>
                  <td> 
                    {
                        user.isAdmin ? 
                        (
                          <button className='button is-danger' disabled> Admin not deletable </button>
                        ) :
                        (
                          // <button className='button is-danger' onClick={()=> deleteUser(user.id)}> Delete </button>
                          <button onClick={() => {setShowModal(true); handleId(user.id)}} className='button is-danger'>
                            Delete
                          </button>
                        )
                      }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {
          showModal ?
          <div className="modal-overlay">
            <div className="modal-user">
              <h1 className='has-text-centered'> Are you sure to delete this item? </h1>
              <div className='is-flex is-justify-content-center'>
                <button className='button is-danger mr-3' onClick={() => {deleteUser(id); setShowModal(false)}}> Yes </button>
                <button className='button is-success' onClick={()=> setShowModal(false)}> Cancel </button>
              </div>
            </div>
          </div>
        : ""
        }

        <Pagination
          totalCourse={users.length}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      
    </Dashboard>
  )
}

export default ViewUsers
