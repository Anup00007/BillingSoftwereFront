import Manubar from "./components/Manubar/Manubar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from "./pages/login/Login";
const App = () =>{
const location= useLocation();
return (
<div>
  {location.pathname!=="/login" && <Manubar/>}

    <div><Toaster/></div>
    <Routes>
      <  Route path="/dashboard" element= {<Dashboard />} />
       <  Route path="/categories" element= {<ManageCategory />} />
        <  Route path="/users" element= {<ManageUsers />} />
       <  Route path="/items" element= {<ManageItems />} />
        <  Route path="/explore" element= {<Explore />} />
         <Route path="/login" element={<Login />} />
       <  Route path="/" element= {<Dashboard />} />
      
    </Routes>
</div>


);

}
export default App;