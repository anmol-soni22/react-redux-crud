import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshApi } from "../../api/authApi";
import { loginSuccess } from "../../store/authSlice";
import { LinearProgress } from "@mui/material";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenOnRefresh = async () => {
      try {
        const user = await refreshApi();
        dispatch(loginSuccess(user));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!isLoggedIn) {
      checkTokenOnRefresh();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, dispatch]);

  if (loading) {
    return <LinearProgress />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/unauthenticated" />;
};

export default PrivateRoute;
