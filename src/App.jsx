import Manubar from "./components/Manubar/Manubar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from "./pages/login/Login";
import OrderHistory from "./pages/orderhistory/OrderHistory";
import { useContext } from "react";
import { AppContext } from "./contect/AppContext";

const App = () => {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  const ProtectedRoute = ({ element, allowedRole }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRole && !allowedRole.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  return (
    <div>
      {location.pathname !== "/login" && <Manubar />}
      <div><Toaster /></div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        
        {/* Admin only routes */}
        <Route path="/categories" element={<ProtectedRoute element={<ManageCategory />} allowedRole={['ROLE_ADMIN']} />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRole={['ROLE_ADMIN']} />} />
        <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRole={['ROLE_ADMIN']} />} />
        
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/" element={<Dashboard />} />
        
        {/* Optional: handle 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
