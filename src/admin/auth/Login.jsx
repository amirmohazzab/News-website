import React, {useContext} from 'react'
import './auth.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../context/context'


const formSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required()
})

const Login = () => {

    const {login, error} = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            login(values)
        },
        validationSchema: formSchema
    });
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="background-overlay"></div>
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <form className="box" onSubmit={formik.handleSubmit}>
                            <h1 className="title has-text-centered mb-5">
                                Management Panel
                            </h1>
                            <h1 className='has-text-centered has-text-danger'>
                                {error}
                            </h1>
                            <div className="field">
                                <label className="label"> Email </label>
                                <div className="control">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder='example * Example@gmail.com'
                                        value={formik.values.email}
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
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
                                        placeholder='pasword'
                                        value={formik.values.password}
                                        onChange={formik.handleChange("password")}
                                        onBlur={formik.handleBlur("password")}
                                    /> 
                                    <p className='help has-text-danger'>
                                        {formik.touched.password && formik.errors.password}
                                    </p> 
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button type='submit' className="button is-success is-fullwidth">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default Login
