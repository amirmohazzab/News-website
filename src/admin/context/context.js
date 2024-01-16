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
    const [category, setCategory] = useState([]);
    const [errorVideo, setErrorVideo] = useState("");
    const [allVideo, setAllVideo] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorRegister, setErrorRegister] = useState("");
    const [errorUpdateUser, setErrorUpdateUser] = useState("");
    const [errorUpdateNews, setErrorUpdateNews] = useState("");
    const [errorCreateNews, setErrorCreateNews] = useState("");
    const [comments, setComments] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [profileName, setProfileName] = useState();
    const [errorUpdateProfile, setErrorUpdateProfile] = useState("");


    const [perPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const navigate = useNavigate();
    

    useEffect(()=> {
        refreshToken();
        profile();
    }, []);

    useEffect(()=> {
        getAllUsers();
        getAllComments();
        handleNews();
    }, [])

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
            }
            return config
        }, (error) => {
            return Promise.reject(error)
        }
    )


    const register = async(inputs) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/users/register`, inputs, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if(res.data.error){
                setErrorRegister(res.data.error)
            }else{
                successMessage(res.data.msg)
                navigate('/view-user')
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                profile();
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
            setUsers(res.data)
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
            if (res.data.error) {
                setErrorCreateNews(res.data.error)
            }
            if (res.data.msg) {
                successMessage(res.data.msg);
                navigate('/view-news')
            }
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
            if (res.data.error) {
                setErrorUpdateNews(res.data.error)
            }
            if (res.data.msg) {
                successMessage(res.data.msg);
                navigate('/view-news')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const createCategory = async(value) => {
        try {
            const res = await axiosJWT.post(`${baseUrl}/create-category`, value, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            successMessage(res.data.msg);
            navigate('/view-category');
        } catch (error) {
            console.log(error)
        }
    }


    const getCategory = async(value) => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/get-category`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setCategory(res.data)
        } catch (error) {
            console.log(error)
        }
    };


    const updateCategory = async (values) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/update-category/${values.id}`, values, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            successMessage(res.data.msg);
            navigate('/view-category')
        } catch (error) {
            console.log(error)
        }
    };


    const deleteCategory = async(id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/delete-category/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            successMessage(res.data.msg);
            getCategory();
        } catch (error) {
            console.log(error)
        }
    };


    const createVideo = async (data) => {

       const formData = new FormData();
       formData.append("file", data.file);

       try {
            const res = await axiosJWT.post(`${baseUrl}/create-video`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.error) {
                setErrorVideo(res.data.error)
            }
            if (res.data.msg) {
                successMessage(res.data.msg);
                navigate('/view-video')
            }
       } catch (error) {
            console.log(error)
       }
    };


    const getAllVideo = async() => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/get-video`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setAllVideo(res.data)
        } catch (error) {
            console.log(error)
        }
    };


    const editVideo = async (data) => {

        const formData = new FormData();
        formData.append("file", data.file);

        try {
            const res = await axiosJWT.put(`${baseUrl}/edit-video/${data.id}}`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if (res.data.error) {
                setErrorVideo(res.data.error)
            }
            if (res.data.msg) {
                successMessage(res.data.msg);
                navigate('/view-video')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const deleteVideo = async (id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/delete-video/${id}}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data.msg)
            getAllVideo()
        } catch (error) {
            console.log(error)
        }
    };


    const updateUser = async(value) => {
        try {
            const res = await axiosJWT.put(`${baseUrl}/users/${value.id}`, value, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if(res.data.error){
                setErrorUpdateUser(res.data.error)
            }else{
                successMessage(res.data.msg)
                navigate('/view-user')
            }
        } catch (error) {
            console.log(error)
        }
    };


    const deleteUser = async(id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/users/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data.msg)
            getAllUsers();
        } catch (error) {
            console.log(error)
        }
    };


    const logout = async() => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/users/logout`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if(res.data.error){
                console.log(res.data.error)
            }else{
                successMessage(res.data.msg)
                navigate('/administrator')
            }
        } catch (error) {
            console.log(error)
        }
    };


    const getAllComments = async() => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/comment`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
    };


    const deleteComment = async(id) => {
        try {
            const res = await axiosJWT.delete(`${baseUrl}/comment/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            successMessage(res.data.msg)
            getAllComments()
        } catch (error) {
            console.log(error)
        }
    };


    const activeComment = async(id) => {
        const data = {
            isActive: true
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/comment/active/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getAllComments()
            successMessage(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    };


    const inactiveComment = async(id) => {
        const data = {
            isActive: false
        }
        try {
            const res = await axiosJWT.put(`${baseUrl}/comment/unactive/${id}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            getAllComments()
            successMessage(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    };


    const updateProfile = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("password", data.password);
            formData.append("confPassword", data.confPassword);
            formData.append("file", data.file);
            formData.append("id", data.id);

            const res = await axiosJWT.put(`${baseUrl}/users/profile/${data.id}`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if(res.data.error){
                setErrorUpdateProfile(res.data.error)
            }else{
                successMessage(res.data.msg)
                navigate('/dashboard')
            }
            //console.log(res.data.error)
        } catch (error) {
            console.log(error)
        }
    };


    const profile = async() => {
        try {
            const res = await axiosJWT.get(`${baseUrl}/users/profile`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setProfilePhoto(res.data.url);
            setProfileName(res.data.name);
        } catch (error) {
            console.log(error)
        }
    };





    return (
        <AuthContext.Provider 
            value={{
                login, 
                error, 
                getAllUsers, 
                axiosJWT, 
                token, 
                createNews, 
                handleNews, 
                news, 
                deleteNews, 
                singleNews, 
                singlePost, 
                updateNews,
                createCategory,
                getCategory,
                category,
                updateCategory,
                deleteCategory,
                createVideo,
                errorVideo,
                setErrorVideo,
                getAllVideo,
                allVideo,
                deleteVideo,
                editVideo,
                currentPage,
                perPage,
                handlePageChange,
                register,
                errorRegister,
                setErrorRegister,
                users,
                updateUser,
                errorUpdateUser,
                setErrorUpdateUser,
                deleteUser,
                errorCreateNews,
                setErrorCreateNews,
                errorUpdateNews, 
                setErrorUpdateNews,
                logout,
                getAllComments,
                comments,
                deleteComment,
                activeComment,
                inactiveComment,
                userId,
                updateProfile,
                profile,
                profilePhoto,
                profileName,
                setErrorUpdateProfile,
                errorUpdateProfile

            }}>
            {children}
        </AuthContext.Provider>
    )

}