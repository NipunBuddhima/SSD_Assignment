// Protected Route to denied router access to unauthorized parties

import { Outlet, Navigate } from "react-router-dom";
import AxiosController from "../../../controllers/axios.controller.js";
import { useEffect, useState } from "react";
// import LoadingIndicator from "../../../components/common/LoadingIndicator";
import Loader from "../../../layouts/loader/Loader.js"
import useCookie from "../../../hooks/useCookies.js";


const ProtectedRoute = ({ allowedUsers }) => {

  // Create variable to save autheniticated status - default false
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  // Loading screen
  let [loading, setLoading] = useState(true);

  // Create cookie object to get cookie details to check roleID
  let [getCookie, setCookie] = useCookie();

  // Print allowed user which passed as class parameter above
  console.log(allowedUsers);

  // Authorize access with JWT [NOT CLEAR------------------------------------------------------]
  useEffect(() => {
    const checkAuth = async () => {
      try {
        let response = await AxiosController.instance.post("/api/user/auth");
        console.log(response);
        if (response.data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="screen-overlay">
        {/* <LoadingIndicator /> */}
        <Loader/>
      </div>
    );
  } else if (isAuthenticated) {

    let roleId = getCookie('user-role-id'); // Get user role ID by cookies
    let userAuthorized = allowedUsers === "*" || allowedUsers.includes(roleId);

    if (userAuthorized) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
