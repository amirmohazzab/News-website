import React from 'react'
import TopMenu from '../components/Home/TopMenu/TopMenu'
import Navbar from '../components/Home/Navbar/Navbar'
import about from '../assets/images/about.webp'
import Footer from '../components/Home/Footer/Footer'

const About = () => {
  return (
    <>
      <TopMenu />
      <Navbar />
      <div className="about pt-6">
        <div className="container">
            <div className="columns">
                <div className="column">
                    <h className="title"> More about us </h>
                    <p className='is-size-5 mt-4'> lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem </p>
                </div>
                <div className="column">
                    <img src={about} alt="" />
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
