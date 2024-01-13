import React, {useContext} from 'react'
import Dashboard from '../../Dashboard'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { AuthContext } from '../../../context/context'

const formSchema = Yup.object({
    name: Yup.string().required("Category name is required")
    .min(3, 'Character number not less than 3')
    .max(15, 'Character number not more than 15')
})

const AddCategory = () => {

    const {createCategory} = useContext(AuthContext);


    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: (values) => {
            createCategory(values)
        },
        validationSchema: formSchema
    });

  return (
    <Dashboard>
        <form onSubmit={formik.handleSubmit}>
            <div className='field'>
                <label className='label'> Category Name </label>
                <div className='control'>
                    <input 
                        type='text' 
                        className='input' 
                        placeholder='example * social'
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
                    <button type='submit' className='button is-success px-6 '> Save </button>
                </div>
            </div>
        </form>
    </Dashboard>
  )
}

export default AddCategory
