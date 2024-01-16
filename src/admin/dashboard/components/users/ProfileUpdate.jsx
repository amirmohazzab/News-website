import React, { useState, useContext, useEffect } from 'react'
import Dashboard from '../../Dashboard'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { AuthContext } from '../../../context/context';
import { Link, useParams } from 'react-router-dom';

const formSchema = Yup.object({
  name: Yup.string().min(3, "characters not less than 3").max(15, "characters not more than 15").required(),
  password: Yup.string().min(4, "characters not less than 4").max(20, "characters not more than 20").required(),
  confPassword: Yup.string().min(4, "characters not less than 4").max(20, "characters not more than 20").required("Repeat password is a required field"),
})


const ProfileUpdate = () => {

    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState("");

    const {updateProfile, errorUpdateProfile, setErrorUpdateProfile} = useContext(AuthContext)

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image))
    }

    useEffect(()=> {

        return ()=> {
            setErrorUpdateProfile();
        }
    }, [])


    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
          name: "",
          password: "",
          confPassword: "",
          file: "",
          id: id
        },
        onSubmit: (values) => {
            const data = {
                name: values.name,
                password: values.password,
                confPassword: values.confPassword,
                file: file,
                id: id
            }
            updateProfile(data)
        },
        validationSchema: formSchema
    });

  return (
    <Dashboard>
        <div className='is-flex' >
          <p className='help has-text-danger is-size-6 mb-4'>
            {errorUpdateProfile}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className="field mt-5">
                <label className="label"> News Image </label>
                <div className="control">
                   <input 
                        type="file" 
                        className="input"
                        onChange={loadImage} 
                    />
                    {
                        preview ? 
                        (
                            <figure className='mt-3'>
                                <img src={preview} width="250" alt="" />
                            </figure>
                        ) 
                        : 
                        ("")
                    }
                </div>
            </div>

            <div className="field">
                <label className="label"> Name </label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='example * your name'
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.name && formik.errors.name}
                    </p>
                </div>
            </div>

            <div className="field">
                <label className="label"> Password </label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='example * 123456'
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.password && formik.errors.password}
                    </p>
                </div>
            </div>

            <div className="field">
                <label className="label"> Repeat Password </label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='example * 123456'
                        value={formik.values.confPassword}
                        onChange={formik.handleChange('confPassword')}
                        onBlur={formik.handleBlur('confPassword')}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.confPassword && formik.errors.confPassword}
                    </p>
                </div>
            </div>

            <div className="field mt-6">
                <div className="control">
                    <button type='submit' className="button is-success px-6"> Save </button>
                </div>
            </div>
        </form>

        
      
    </Dashboard>
  )
}

export default ProfileUpdate
