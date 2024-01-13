import React, {useContext, useState, useEffect} from 'react'
import Dashboard from '../../Dashboard'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { AuthContext } from '../../../context/context'


const formSchema = Yup.object({
    video: Yup.string().required()
    .max('5Mb', 'Vodeo not more than 5Mb')
})

const AddVideo = () => {

    const {createVideo, errorVideo, setErrorVideo} = useContext(AuthContext);
    const [file, setFile] = useState({});

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
                file : file
            }
            createVideo(data)
        },
    });

  return (
    <Dashboard>
        <form onSubmit={formik.handleSubmit}>
            <div className="control">
            <label className='label'> Choose video </label>
                <input 
                    type="file" 
                    className="input" 
                    onChange={e => setFile(e.target.files[0])}
                />
                <p className='help has-text-danger'>
                   {errorVideo}
                </p>
            </div>
            <button type='submit' className="button is-success is-size-6 px-6 my-5">
                Add Video
            </button>
        </form>
    </Dashboard>
  )
}

export default AddVideo
