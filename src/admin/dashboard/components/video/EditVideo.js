import React, {useContext, useState, useEffect} from 'react'
import Dashboard from '../../Dashboard'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/context'


const formSchema = Yup.object({
    video: Yup.string().required("Video is required")
    .max("5Mb", 'Character number not more than 5Mb')
})

const EditVideo = () => {

    const {editVideo, getAllVideo, errorVideo, setErrorVideo} = useContext(AuthContext)
    const [file, setFile] = useState({});

    const {id} = useParams();

    const loadVideo = (e) => {
        const video = e.target.files[0];
        setFile(video);
    }

    useEffect(()=> {
        return () => {
            setErrorVideo("")
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            file: ""
        },
        onSubmit: (values) => {
            const data = {
                file: file, 
                id: id
            }
            editVideo(data)
        },
    });

    return (
        <Dashboard>
            <div className='is-flex is-justify-content-end' >
                <Link to='/view-video' className='button px-6 is-success mb-6'>
                    Show Video
                </Link>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='field'>
                    <label className='label'> Choose video </label>
                    <div className='control'>
                        <input 
                            type='file' 
                            className='input' 
                            onChange={loadVideo}
                        />
                        <p className='help has-text-danger'>
                            {errorVideo}
                        </p>
                    </div>
                </div>
                <div className='field'>
                    <div className='control'>
                        <button type='submit' className='button is-success px-6 '> Edit Video </button>
                    </div>
                </div>
            </form>
        </Dashboard>
    )
}

export default EditVideo

