import React from 'react'
import Dashboard from '../../Dashboard'
import { Link } from 'react-router-dom'

const ViewNews = () => {
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
              <th> Content </th>
              <th> Image </th>
              <th> Author </th>
              <th> Edit </th>
              <th> Delete </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td> 1 </td>
              <td> test </td>
              <td> test content </td>
              <td> image </td>
              <td> amir </td>
              <td> 
                <button className='button is-success'> Edit </button>
              </td>
              <td> 
                <button className='button is-dander'> Edit </button>
              </td>
            </tr>
          </tbody>
        </table>
    </Dashboard>
   
  )
}

export default ViewNews
