import React, { useContext, useEffect } from 'react'
import Dashboard from '../../Dashboard'
import { Link, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { AuthContext } from '../../../context/context';


const formSchema = Yup.object({
  name: Yup.string().min(3, "characters not less than 3").max(15, "characters not more than 15").required(),
  email: Yup.string().email("email must valid").required(),
  password: Yup.string().min(4, "characters not less than 4").max(20, "characters not more than 20").required(),
  confPassword: Yup.string().min(4, "characters not less than 4").max(20, "characters not more than 20").required("Repeat password is a required field"),
  isAdmin: Yup.string().required()
})

const EditUser = () => {

    const {state} = useLocation();
    const {updateUser, errorUpdateUser, setErrorUpdateUser} = useContext(AuthContext);

    useEffect(()=> {
        return ()=> {
            setErrorUpdateUser()
        }
    }, [])

    const formik = useFormik({
        initialValues: {
          name: state.name,
          email: state.email,
          password: "",
          confPassword: "",
          isAdmin: "",
          id: state.id
        },
        onSubmit: (values) => {
            updateUser(values);
        },
        validationSchema: formSchema
    });

  return (
    <Dashboard>
        <div className='is-flex is-justify-content-end' >
          <Link to='/view-user' className='button px-6 is-success mb-4'>
              Show Users
          </Link>
        </div>
        <div className='is-flex' >
          <p className='help has-text-danger is-size-6 mb-4'>
            {errorUpdateUser}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className="label"> Name </label>
                <div className="control">
                    <input 
                        type="text" 
                        className="input" 
                        placeholder='example * amirhosein'
                        defaultValue={state.name}
                        onChange={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.name && formik.errors.name}
                    </p>
                </div>
            </div>
            <div className="field">
                <label className="label"> Email </label>
                <div className="control is-fullwidth">
                    <input 
                      type="email" 
                      className="input" 
                      placeholder='example * example@gmail.com'
                      defaultValue={state.email}
                      onChange={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                    />
                    <p className='help has-text-danger'>
                        {formik.touched.email && formik.errors.email}
                    </p>
                </div>
            </div>
            <div className="field">
                <label className="label"> Password </label>
                <div className="control">
                        <input 
                          type="password" 
                          className="input" 
                          placeholder='example * 12345'
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
                          type="password" 
                          className="input" 
                          placeholder='example * 12345'
                          value={formik.values.confPassword}
                          onChange={formik.handleChange('confPassword')}
                          onBlur={formik.handleBlur('confPassword')}
                        />
                        <p className='help has-text-danger'>
                            {formik.touched.confPassword && formik.errors.confPassword}
                        </p>
                </div>
            </div>
            <div className="field">
                <label className="label"> User role </label>
                <div className="control">
                        <div className="select is-fullwidth">
                          <select
                             value={formik.values.isAdmin}
                             onChange={formik.handleChange('isAdmin')}
                             onBlur={formik.handleBlur('isAdmin')}
                          >
                            <option> choose </option>
                            <option value="0"> Author </option>
                            <option value="1"> Admin </option>
                          </select>
                          <p className='help has-text-danger'>
                            {formik.touched.isAdmin && formik.errors.isAdmin}
                          </p>
                        </div>
                </div>
            </div>

            <div className="field mt-6">
                <div className="control">
                    <button type='submit' className="button is-success px-6"> Edit user </button>
                </div>
            </div>
        </form>
    </Dashboard>
  )
}

export default EditUser
