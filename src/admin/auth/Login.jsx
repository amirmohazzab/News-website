import React from 'react'
import './auth.css'

const Login = () => {
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="background-overlay"></div>
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <form className="box">
                            <h1 className="title has-text-centered mb-5">
                                Management Panel
                            </h1>
                            <div className="field">
                                <label className="label"> Email </label>
                                <div className="control">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder='example * Example@gmail.com'
                                    />  
                                </div>
                            </div>
                            <div className="field">
                                <label className="label"> Password </label>
                                <div className="control">
                                    <input 
                                        type="password" 
                                        className="input" 
                                        placeholder='pasword'
                                    />  
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
