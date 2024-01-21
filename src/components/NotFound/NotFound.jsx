import React from 'react'
import './notfound.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-view is-flex is-align-items-center is-justify-content-center">
        <div className="container">
            <div className="column has-text-centered">
                {/* {
                    userId ? (
                            <> */}
                                <h1 className='has-text-white has-text-centered is-size-2 is-fullwidth'> Page Not Found </h1>
                                <Link to="/" className="button is-success large is-size-5 mt-6"> Go to Main Page  </Link>
                            {/* </>
                    ) :
                    (
                    <>
                        <h1 className='has-text-white has-text-centered is-size-2 is-fullwidth'>شما برای دیدن این صفحه ابتدا باید وارد حساب کاربری خود شوید</h1>
                                <Link to="/administrator" className="button is-success large is-size-5 mt-6">ورود به حساب کاربری</Link>
                    </>      
                    )
                } */}
            </div>
        </div>
    </div>
  )
}

export default NotFound
