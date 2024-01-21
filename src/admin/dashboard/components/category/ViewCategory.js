import React, {useContext, useEffect, useState} from 'react'
import Dashboard from '../../Dashboard'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../../context/context'
import Pagination from '../../Pagination'
import { paginate } from '../../../../utils/paginate'
import './ViewCategory.css'


const ViewCategory = () => {


  const { getCategory, category, deleteCategory, currentPage, perPage, handlePageChange} = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  const handleId = (id) => {
    setId(id);
  }

  let categoryData = paginate(category, currentPage, perPage);

  useEffect(()=> {
    getCategory()
  }, [])

  return (
    <Dashboard>
    <div className='is-flex is-justify-content-end'>
      <Link to='/add-category' className='button px-6 is-success mb-4'>
        Add category
      </Link>
    </div>

    
    <table className='table is-fullwidth'>
          <thead >
            <tr>
              <th> No </th>
              <th> Name </th>
              <th> Edit </th>
              <th> Delete </th>
            </tr>
          </thead>

          <tbody>
            {
              categoryData ?
              categoryData.map((item, index)=>(
                <tr key={item.id}>
                  <td className='aval'> {index+1} </td>
                  <td> {item.name} </td>
                  <td> 
                    <Link state={item} to={`/edit-category/${item.id}`} className='button is-info'> Edit </Link>
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
            <div className="modal-category">
              <h1 className='has-text-centered'> Are you sure to delete this item? </h1>
              <div className='is-flex is-justify-content-center'>
                <button className='button is-danger mr-3' onClick={() => {deleteCategory(id); setShowModal(false)}}> Yes </button>
                <button className='button is-success' onClick={()=> setShowModal(false)}> Cancel </button>
              </div>
            </div>
          </div>
        : ""
      }

        <Pagination 
          totalCourse={category.length}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
</Dashboard>
  )
}

export default ViewCategory
