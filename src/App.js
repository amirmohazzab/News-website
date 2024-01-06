import Login from "./admin/auth/Login";
import {Routes, Route} from 'react-router-dom'
import Dashboard from "./admin/dashboard/Dashboard";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
      <>
        <Routes>
          <Route path='/administrator' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </>
    </div>
  );
}

export default App;
