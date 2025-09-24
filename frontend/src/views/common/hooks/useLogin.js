import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create a hook to save logged in userRole ID
export default function useLogin() {

  const navigate = useNavigate();

  let [roleId, setRoleId] = useState(0);


  // Auto navigation when roleID set
  useEffect(() => {
    function redirect() {
      switch (roleId) {

        case 1:
          // This should be admin (manager)
          navigate('/manager/');
          break;

        case 2:
          //This should be branch managers
          navigate('/branch-manager/');
          break;

        case 4:
          //This should be delivery person
          navigate('/delivery-person/');
          break;

        case 5:
          //This should be transport agent
          navigate('/transport-agent/');
          break;

        case 6:
          //This should be client
          navigate('/client/');
          break;

        default:
          // If no roll id navigate to login page [NOT WORKING ❌]
          navigate('/login');
          break;
      }
    }
    redirect();
  }, [roleId])

  // Create a function to update role ID and return
  function updateRoleId(value) {
    setRoleId(value);
  }
  return [updateRoleId];
}
