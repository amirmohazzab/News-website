import React, {useState, useEffect, useContext} from 'react'
import Dashboard from '../../Dashboard'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {Link, useLocation, useParams} from 'react-router-dom'
import { AuthContext } from '../../../context/context'
import {baseUrl} from '../../../../utils/baseUrl'




const formSchema = Yup.object({
    title: Yup.string().required("News title is required"),
    desc: Yup.string().required("News Content is required"),
    catId: Yup.string().required("Choosing category is required")
})

const EditNews = () => {

    const {axiosJWT, token, singleNews, updateNews, errorUpdateNews, setErrorUpdateNews} = useContext(AuthContext);
    const [categoryList, setCategoryList] = useState([]);
    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState("");

    const {id} = useParams();
    const {state} = useLocation()
    
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image))
    }



    useEffect(()=>{
        getCategory();
        singleNews(id);
    }, [])


    useEffect(()=> {
        
        return ()=> {
            setErrorUpdateNews()
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
            title: state.title,
            desc: state.desc,
            catId: state.catId,  
            file: ""
        },
        onSubmit: (values) => {
            const data = {
                title: values.title,
                desc: values.desc,
                catId: values.catId,
                file: file, 
                id: id
            }
            updateNews(data)
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
            {errorUpdateNews}
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
                        defaultValue={state.title}
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
                        defaultValue={state.desc}
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
                            defaultValue={state.catId}
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
                    <button type='submit' className="button is-success px-6"> Edit news </button>
                </div>
            </div>
        </form>
    </Dashboard>
  )
}

export default EditNews
