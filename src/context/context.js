import { createContext, useEffect, useReducer, useState } from "react";
import { videoReducer } from "./reducers/videoReducer";
import { VIDEO_FAIL, VIDEO_REQUEST, VIDEO_SUCCESS } from "./constants/videoConstants";
import { baseUrl } from './../utils/baseUrl';
import axios from 'axios'
import { lastNewsReducer } from "./reducers/lastNewsReducer";
import { LAST_NEWS_FAIL, LAST_NEWS_REQUEST, LAST_NEWS_SUCCESS } from "./constants/lastNewsConstants";
import { catNewsReducer } from './reducers/categoryReducer';
import { CATEGORY_NEWS_FAIL, CATEGORY_NEWS_REQUEST, CATEGORY_NEWS_SUCCESS } from "./constants/categoryConstants";
import { useLocation } from "react-router-dom";
import { popularNewsReducer } from "./reducers/popularReducer";
import { POPULAR_NEWS_FAIL, POPULAR_NEWS_REQUEST, POPULAR_NEWS_SUCCESS } from "./constants/popularConstants";
import { successMessage } from './../utils/message';


export const HomeContext = createContext();

const INITIAL_STATE = {
    loading: 'true',
    error: '',
    videos: []
}

const INITIAL_STATE_LAST_NEWS = {
    loading: 'true',
    error: '',
    lastNews: []
}

const INITIAL_STATE_CAT_NEWS = {
    loading: 'true',
    error: '',
    news: []
}

const INITIAL_STATE_POPULAR_NEWS = {
    loading: 'true',
    error: '',
    popularNews: []
}

export const HomeContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
    const [lastNewsState, lastNewsDispatch] = useReducer(lastNewsReducer, INITIAL_STATE_LAST_NEWS);
    const [catNewsState, catNewsDispatch] = useReducer(catNewsReducer, INITIAL_STATE_CAT_NEWS);
    const [popularNewsState, popularNewsDispatch] = useReducer(popularNewsReducer, INITIAL_STATE_POPULAR_NEWS);
    const [category, setCategory] = useState([]);
    const [newsComment, setNewsComment] = useState([])

    const cat = useLocation().search;
    console.log(cat)

    useEffect(()=> {
        LastVideo()
        LastNews()
        loadCategory()
        LoadCatNews()
        LoadMostPopular()
    }, [])

    const LastVideo = async () => {
        try {
            dispatch({type: VIDEO_REQUEST})
            const {data} = await axios.get(`${baseUrl}/single-video`);
            dispatch({type: VIDEO_SUCCESS, payload: data})
        } catch (error) {
            console.log(error)
            dispatch({type: VIDEO_FAIL, payload: error.response.data.message})
        }
    }


    const LastNews = async () => {
        try {
            lastNewsDispatch({type: LAST_NEWS_REQUEST})
            const {data} = await axios.get(`${baseUrl}/news/lastnews`);
            lastNewsDispatch({type: LAST_NEWS_SUCCESS, payload: data})
        } catch (error) {
            console.log(error)
            lastNewsDispatch({type: LAST_NEWS_FAIL, payload: error.response.data.message})
        }
    }


    const LoadView = async(id) => {
        try {
            const res = await axios.get(`${baseUrl}/news/detail/${id}`);
            LoadMostPopular();
        } catch (error) {
            console.log(error)
        }
    }


    const loadCategory = async() => {
        try {
            const res = await axios.get(`${baseUrl}/category/home`);
            setCategory(res.data);
        } catch (error) {
            console.log(error)
        }
    }


    const createComment = async(data) => {
        try {
            const res = await axios.post(`${baseUrl}/comment`, data);
            successMessage(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }


    const getSingleComment = async(id) => {
        try {
            const res = await axios.get(`${baseUrl}/comment/${id}`);
            setNewsComment(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    
    const LoadCatNews = async () => {
        try {
            catNewsDispatch({type: CATEGORY_NEWS_REQUEST})
            const {data} = await axios.get(`${baseUrl}/news/cat-news${cat}`);
            catNewsDispatch({type: CATEGORY_NEWS_SUCCESS, payload: data})
        } catch (error) {
            console.log(error)
            catNewsDispatch({type: CATEGORY_NEWS_FAIL, payload: error.response.data.message})
        }
    }


    const LoadMostPopular = async () => {
        try {
            popularNewsDispatch({type: POPULAR_NEWS_REQUEST})
            const {data} = await axios.get(`${baseUrl}/news/popular`);
            popularNewsDispatch({type: POPULAR_NEWS_SUCCESS, payload: data})
        } catch (error) {
            console.log(error)
            popularNewsDispatch({type: POPULAR_NEWS_FAIL, payload: error.response.data.message})
        }
    }


    return (
        <HomeContext.Provider value={{
            loading: state.loading, 
            error: state.error, 
            videos: state.videos, 
            loadingLastNews: lastNewsState.loading,
            errorLastNews: lastNewsState.error,
            lastNews: lastNewsState.lastNews,
            loadingCatNews: catNewsState.loading,
            errorCatNews: catNewsState.error,
            news: catNewsState.news,
            loadingPopular: popularNewsState.loading,
            errorPopular: popularNewsState.error,
            popularNews: popularNewsState.popularNews,
            category,
            LoadCatNews,
            createComment,
            getSingleComment,
            newsComment,
            LoadView,
        }}>
            {children}
        </HomeContext.Provider>
    )
}