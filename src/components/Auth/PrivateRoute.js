import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshApi } from "../../api/authApi";
import { loginSuccess } from "../../store/authSlice";
import { LinearProgress } from "@mui/material";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/unauthenticated");
    }
    const checkTokenOnRefresh = async () => {
      try {
        const user = await refreshApi(token);
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

  if (!isLoggedIn) {
    return location.pathname === "/" ? (
      <Navigate to="/login" />
    ) : (
      <Navigate to="/unauthenticated" />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
