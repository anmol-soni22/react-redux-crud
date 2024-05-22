import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "./style";
import { Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header({ open, handleDrawerOpen, drawerWidth }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="fixed" open={open} drawerwidth={drawerWidth}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Product Management
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
          Welcome, {user.firstName}
        </Typography>
        <LogoutIcon onClick={handleLogout} style={{ cursor: "pointer" }} />
      </Toolbar>
    </AppBar>
  );
}
