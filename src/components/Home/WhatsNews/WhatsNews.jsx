import React, { useContext, useEffect } from "react";
import sendNews from "../../../assets/images/sendnews.jpg";
import img from "../../../assets/images/1.jpeg"
import { Link, NavLink, useLocation } from "react-router-dom";
import "./whatsnews.css"
import { HomeContext } from "../../../context/context";
import Loader from "../../Loading/Loader";
const WhatsNews = () => {

  const {category, loadingCatNews, news, LoadCatNews} = useContext(HomeContext);
  const cat = useLocation().search;

  useEffect(()=> {
    LoadCatNews()
  },[cat])

  return (
    <div id="whats-news" className="py-5">
      <div className="container">
        <div className="columns is-flex-widescreen is-block-tablet">
          <div className="column is-flex is-one-quarter-widescreen is-justify-content-center">
            <img src={sendNews} className="sendnews" alt="" />
          </div>
          <div className="column is-three-quarters-widescreen is-justify-content-center">
            <div className="whats-news has-background-white p-5">
              <div className="whats-news-title is-flex is-justify-content-space-between is-align-items-center">
                <div className="whats-news-nav">
                  <ul className="is-flex">
                    <li className="ml-5 has-text-weight-bold">
                      <NavLink to="/"> All </NavLink>
                    </li>
                    {
                      category?.map((cat) => (
                        <li className="ml-5 has-text-weight-bold" key={cat.id}>
                          <NavLink to={`/?cat=${cat.id}`}> {cat.name} </NavLink>
                        </li>
                      ))
                    }
                  </ul>
                </div>

                <div className="whats-news-name">
                     <h1 className="is-size-2 title"> Whats news </h1>
                </div>
              </div>

              {
                loadingCatNews ? (
                  <div className="has-text-centered">
                    <Loader />
                  </div>
                ) : (
                  <div className="whats-news-post mt-6">
                    {
                      news?.map((n) => (
                        <div className="whats-news-post-item" key={n.id}>
                          <div className="whats-news-post-item-img">
                            <Link state={n} to={`/detail/${n.id}`}>
                              <img src={n.url} alt="" />
                            </Link>
                          </div>
                          <div className="whats-news-post-item-description">
                            <Link state={n} to={`/detail/${n.id}`}>
                              <p> {n.desc} </p>   
                            </Link>
                            <div className="whats-news-post-item-date">
                              <p>{n.createdAt}</p>
                            </div>
                          </div>
                    </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNews;

