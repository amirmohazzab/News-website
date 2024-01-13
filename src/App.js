import Login from "./admin/auth/Login";
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ViewNews from "./admin/dashboard/components/news/ViewNews";
import Main from "./admin/dashboard/components/main/Main";
import AddNews from "./admin/dashboard/components/news/AddNews";
import EditNews from "./admin/dashboard/components/news/EditNews";
import ViewCategory from "./admin/dashboard/components/category/ViewCategory";
import AddCategory from "./admin/dashboard/components/category/AddCategory";
import EditCategory from "./admin/dashboard/components/category/EditCategory";
import ViewVideo from "./admin/dashboard/components/video/ViewVideo";
import AddVideo from "./admin/dashboard/components/video/AddVideo";
import EditVideo from "./admin/dashboard/components/video/EditVideo";


function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path='/administrator' element={<Login />} />
          <Route path='/dashboard' element={<Main />} />

          <Route path='/view-news' element={<ViewNews />} />
          <Route path='/add-news' element={<AddNews />} />
          <Route path='/edit-news/:id' element={<EditNews />} />

          <Route path='/view-category' element={<ViewCategory />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/edit-category/:id' element={<EditCategory />} />

          <Route path='/view-video' element={<ViewVideo />} />
          <Route path='/add-video' element={<AddVideo />} /> 
          <Route path='/edit-video/:id' element={<EditVideo />} />
        </Routes>
        <ToastContainer />
      </>
    </div>
  );
}

export default App;
