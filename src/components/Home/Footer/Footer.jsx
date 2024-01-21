import React, {useContext} from 'react'
import travel from '../../../assets/images/traveling.jpg'
import './footer.css';
import newsImg from '../../../assets/images/1.jpeg'
import logo from '../../../assets/images/logo.jpg'
import { Link } from 'react-router-dom';
import { HomeContext } from '../../../context/context';
import Loader from '../../Loading/Loader';

const Footer = () => {

    const {popularNews, loadingPopular} = useContext(HomeContext);
    console.log(popularNews)

  return (
    <footer className="mt-6 pt-6 pb-6">
        <div className="container pt-6 pb-6">
            <div className="columns">
                <div className="column is-one-third">
                    <img src={travel} alt="" width= "270px" />
                </div>
                <div className="column is-one-third">
                    <h1 className='subtitle has-text-white mb-5'> Popular news </h1>
                    {
                        loadingPopular ? (
                            <div className="has-background-white p-4 has-text-centered">
                                 <Loader />
                            </div>
                        ) : 
                        popularNews.map((pn) => (
                            <ul key={pn.id}>
                                <li className='mt-4'>
                                    <div className="post-footer is-flex is-align-items-center">
                                        <div className="post-footer-image">
                                            <Link state={pn} to={`/detail/${pn.id}`}> 
                                                <img src={pn.url} alt="" />
                                            </Link>
                                        </div>
                                        <div className="post-footer-title pl-3">
                                            <Link state={pn} to={`/detail/${pn.id}`}> 
                                                <h1> {pn.title} </h1>
                                            </Link>
                                            <h1 className='post-footer-name'> {pn.user.name} </h1>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        ))
                    }
                </div>
                <div className="column">
                    <div className="footer-logo">
                        <img src={logo} alt="" width="200px"/>
                    </div>
                    <div className="footer-desc pt-5">
                        <p> lorem ipsum lorem ipsum  lorem ipsum  lorem ipsum  lorem ipsum </p>
                    </div>
                    <div className="footer-address pt-6">
                        <p> Address Address Address</p>
                    </div>
                    <div className="footer-phone mt-6">
                        <p> phone: 098743265</p>
                    </div>
                </div>
            </div>
            <div className="column mt-6 has-text-centered is-flex is-justify-content-center">
                <p> All rights reserved </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
