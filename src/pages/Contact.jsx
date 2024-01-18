import React from 'react'
import Footer from '../components/Home/Footer/Footer'
import TopMenu from '../components/Home/TopMenu/TopMenu'
import Navbar from '../components/Home/Navbar/Navbar';
import contact from '../assets/images/contact.webp'
import * as Yup from 'yup'
import {useFormik} from 'formik'

const formSchema = Yup.object({
    email: Yup.string().required(),
    subject: Yup.string().required(),
    message: Yup.string().required()
})

const Contact = () => {

  const formik = useFormik({
    initialValues: {
        email: "",
        subject: "",
        message: ""
    },
    onSubmit: (values) => {
        console.log(values)
    },
    validationSchema: formSchema
  });

  return (
    <>
      <TopMenu />
      <Navbar />
      <div className="contact pt-6">
        <div className="container">
            <div className="columns">
                <div className="column">
                    <img src={contact} alt="" width="450px" />
                </div>
                <div className="column">
                    <h1 className='title mb-6'>
                        Contact us
                    </h1>
                    <div className="phone-number mb-6 is-size-5">
                      <span> Phone number: </span> <span> 0098655432 </span>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="field">
                        <input 
                          type="text" 
                          className='input' 
                          placeholder='Email' 
                          value={formik.values.email}
                          onChange={formik.handleChange('email')}
                          onBlur={formik.handleBlur('email')}
                        />
                        <p className='help has-text-danger'>
                            {formik.touched.email && formik.errors.email}
                        </p>
                      </div>
                      <div className="field">
                        <input 
                          type="text" 
                          className='input' 
                          placeholder='Subject' 
                          value={formik.values.subject}
                          onChange={formik.handleChange('subject')}
                          onBlur={formik.handleBlur('subject')}
                        />
                        <p className='help has-text-danger'>
                            {formik.touched.subject && formik.errors.subject}
                        </p>
                      </div>
                      <div className="field">
                        <textarea 
                          className='textarea'
                          placeholder='Content'
                          value={formik.values.message}
                          onChange={formik.handleChange('message')}
                          onBlur={formik.handleBlur('message')}
                        >
                        </textarea>
                        <p className='help has-text-danger'>
                            {formik.touched.message && formik.errors.message}
                        </p>
                      </div>
                      <div className="field">
                        <button 
                          type='submit' 
                          className='button is-success px-6'
                        >
                            Send
                        </button>
                      </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact
