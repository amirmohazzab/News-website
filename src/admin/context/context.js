import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import {successMessage} from '../../utils/message'
import {baseUrl} from '../../utils/baseUrl';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [news, setNews] = useState([]);
    const [singlePost, setSinglePost] = useState();

    const navigate = useNavigate();
    

    useEffect(()=> {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setUserId(decoded.userId);
            setAdmin(decoded.isAdmin);
            setExpire(decoded.exp);
        } catch (error) {
            console.log(error)
        }
    };


    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            if (expire * 1000 < currentDate.getTime()) {
                const response = await axios.get('http://localhost:5000/token');
                config.headers.Authorization = `Bearer ${response.data.accessToken}`
                setToken(response.data.accessToken)
                const decoded = jwtDecode(response.data.accessToken);
                setName(decoded.name);
                setUserId(decoded.userId);
                setAdmin(decoded.isAdmin);
                setExpire(decoded.exp);
                console.log(response);
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        }
    )

    const login = async (inputs) => {
        try {
            const res = await axios.post(`${baseUrl}/users/login`, inputs);
            if (res.data.error){
                setError(res.data.error)
            } else {
                navigate("/dashboard")
                successMessage(res.data.msg)
                setName(res.data.name);
                setUserId(res.data.userId);
                setToken(res.data.accessToken);
                setAdmin(res.data.isAdmin);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllUsers = async () => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    const createNews = async(data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("desc", data.desc);
        formData.append("catId", data.catId);
        formData.append("userId", userId);
        formData.append("file", data.file);
        try {
            const res = await axiosJWT.post(`${baseUrl}/news`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            successMessage(res.data.msg)
            navigate('/view-news')
        } catch (error) {
            console.log(error)
        }
    }


    const handleNews = async () => {
        try {
          const res = await axiosJWT.get(`${baseUrl}/news`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setNews(res.data);
        } catch (error) {
            console.log(error)
        }
    }


    const deleteNews = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/news/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            successMessage(res.data.msg)
            handleNews();
        } catch (error) {
            console.log(error)
        }
    }


    const singleNews = async (id) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/news/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setSinglePost(res.data);
        } catch (error) {
            console.log(error)
        }
    }


    const updateNews = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("desc", data.desc);
        formData.append("catId", data.catId);
        formData.append("userId", userId);
        formData.append("file", data.file);

        try {
            const res = await axiosJWT.put(`${baseUrl}/news/${data.id}`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data.msg)
            navigate('/view-news')
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <AuthContext.Provider value={{login, error, getAllUsers, axiosJWT, token, createNews, handleNews, news, deleteNews, singleNews, singlePost, updateNews}}>
            {children}
        </AuthContext.Provider>
    )

}