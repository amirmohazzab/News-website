import React, {useContext} from 'react'
import Dashboard from '../../Dashboard'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/context'


const formSchema = Yup.object({
    name: Yup.string().required("Category name is required")
    .min(3, 'Character number not less than 3')
    .max(15, 'Character number not more than 15')
})

const EditCategory = () => {

    const {updateCategory} = useContext(AuthContext)

    const {state} = useLocation();
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            name: state.name,
            id: id
        },
        onSubmit: (values) => {
            updateCategory(values)
        },
        validationSchema: formSchema
    });

    return (
        <Dashboard>
            <div className='is-flex is-justify-content-end' >
                <Link to='/view-category' className='button px-6 is-success mb-6'>
                    Show Category
                </Link>
            </div>
            <form onSubmit={formik.handleSubmit}>
            <div className='field'>
                <label className='label'> Category Name </label>
                <div className='control'>
                    <input 
                        type='text' 
                        className='input' 
                        placeholder='example * social'
                        defaultValue={state.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.name && formik.errors.name}
                    </p>
                </div>
            </div>
            <div className='field'>
                <div className='control'>
                    <button type='submit' className='button is-success px-6 '> Edit Category </button>
                </div>
            </div>
        </form>
        </Dashboard>
    )
}

export default EditCategory
