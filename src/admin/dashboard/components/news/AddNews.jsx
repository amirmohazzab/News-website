import React, {useContext, useEffect, useState} from 'react'
import Dashboard from './../../Dashboard';
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { AuthContext } from '../../../context/context';
import {baseUrl} from '../../../../utils/baseUrl'
import { Link } from 'react-router-dom';

const formSchema = Yup.object({
    title: Yup.string().required("News title is required"),
    desc: Yup.string().required("News Content is required"),
    catId: Yup.string().required("Choosing category is required")
})

const AddNews = () => {

    const {axiosJWT, token, createNews, errorCreateNews, setErrorCreateNews} = useContext(AuthContext);
    const [categoryList, setCategoryList] = useState([]);
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState("");

    

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image))
    }
    

    useEffect(()=>{
        getCategory()
    }, [])

    useEffect(()=> {
        
        return ()=> {
            setErrorCreateNews()
        }
    }, [])

    const getCategory = async()=>{
        try {
          const res = await axiosJWT.get(`${baseUrl}/get-category`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })
    
          setCategoryList(res.data);
        } catch (error) {
          console.log(error);
        }
    };


    const formik = useFormik({
        initialValues: {
            title: "",
            desc: "",
            catId: "",
            file: ""
        },
        onSubmit: (values) => {
            const data = {
                title: values.title,
                desc: values.desc,
                catId: values.catId,
                file: file
            }
            createNews(data)
        },
        validationSchema: formSchema
    });

  return (
    <Dashboard>
        <div className='is-flex is-justify-content-end' >
          <Link to='/view-news' className='button px-6 is-success mb-4'>
              Show News
          </Link>
        </div>
        <div className='is-flex' >
          <p className='help has-text-danger is-size-6 mb-4'>
            {errorCreateNews}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className="label"> News Title </label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='example * this is title'
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.title && formik.errors.title}
                    </p>
                </div>
            </div>
            <div className="field">
                <label className="label"> News Content </label>
                <div className="control is-fullwidth">
                    <textarea 
                        className="textarea" 
                        placeholder='example * this is content'
                        value={formik.values.desc}
                        onChange={formik.handleChange('desc')}
                        onBlur={formik.handleBlur('desc')}
                    ></textarea>
                    <p className='help has-text-danger'>
                        {formik.touched.desc && formik.errors.desc}
                    </p>
                </div>
            </div>
            <div className="field">
                <label className="label"> News Categories </label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select
                            value={formik.values.catId}
                            onChange={formik.handleChange('catId')}
                            onBlur={formik.handleBlur('catId')}
                        >
                            <option> choose </option>
                            {
                                categoryList.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))
                            }
                        </select>
                        <p className='help has-text-danger'>
                            {formik.touched.catId && formik.errors.catId}
                        </p>
                    </div>
                </div>
            </div>
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

            <div className="field mt-6">
                <div className="control">
                    <button type='submit' className="button is-success px-6"> Save </button>
                </div>
            </div>
        </form>
    </Dashboard>
  )
}

export default AddNews
