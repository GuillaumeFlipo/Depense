import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log(userData.id);
    if (userData.id) {
    } else {
      navigate("/");
    }
  }, []);
  return <Component />;
};

export default ProtectedRoute;
