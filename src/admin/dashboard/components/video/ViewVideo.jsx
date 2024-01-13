import React, {useEffect, useContext, useState} from 'react'
import Dashboard from './../../Dashboard';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/context';
import { paginate } from '../../../../utils/paginate';
import './ViewVideo.css'
import Pagination from '../../Pagination';



const ViewVideo = () => {

    const {getAllVideo, allVideo, deleteVideo, currentPage, perPage, handlePageChange} = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState("");

    const handleId = (id) => {
        setId(id);
    }

    let allVideoData = paginate(allVideo, currentPage, perPage)

    useEffect(()=> {
        getAllVideo()
    }, []);

  return (
    <Dashboard>
        <div className='is-flex is-justify-content-end' >
            <Link to='/add-video' className='button px-6 is-success mb-4'>
                Add Video
            </Link>
        </div>
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    <th> No </th>
                    <th> Video </th>
                    <th> Edit </th>
                    <th> Delete </th>
                </tr>
            </thead>

            <tbody>
                {
                    allVideoData && allVideoData.map((video, index) => (
                        <tr key={video.id}>
                            <td> {index+1} </td>
                            <td> 
                                <video src={video.url} width='70' height="60" controls> </video>
                            </td>
                            <td>
                                <Link state={video} to={`/edit-video/${video.id}`} className="button is-info"> Edit </Link>
                            </td>
                            <td>
                                <button onClick={() => {setShowModal(true); handleId(video.id)}} className='button is-danger'>
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
            <div className="modal-video">
              <h1 className='has-text-centered'> Are you sure to delete this item? </h1>
              <div className='is-flex is-justify-content-center'>
                <button className='button is-danger mr-3' onClick={() => {deleteVideo(id); setShowModal(false)}}> Yes </button>
                <button className='button is-success' onClick={()=> setShowModal(false)}> Cancel </button>
              </div>
            </div>
          </div>
        : ""
        }

        <Pagination
          totalCourse={allVideo.length}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      
    </Dashboard>
  )
}

export default ViewVideo
