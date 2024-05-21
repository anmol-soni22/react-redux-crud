import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { loginApi } from "../../api/authApi";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginApi({ username, password });
      dispatch(loginSuccess(user));
      setError(null); // Clear any previous error
      setSuccess("Login successful. Redirecting...");
      setTimeout(() => {
        setSuccess(null);
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setError("Invalid username or password.");
      dispatch(loginFailure());
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card variant="outlined" sx={{ width: "400px" }}>
        <CardContent>
          <h2 className="mb-4">Login</h2>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "16px" }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: "16px" }} onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}
          <div className="mb-3">
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              error={error !== null}
            />
          </div>
          <div className="mb-3">
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              error={error !== null}
            />
          </div>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
