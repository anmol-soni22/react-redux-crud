import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import LoginPage from "./components/Auth/LoginPage";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductList from "./components/ProductManagement/ProductList";
import PersistentDrawerLeft from "./layout/Layout";
import UnauthenticatedPage from "./components/Auth/UnauthenticatedPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthenticated" element={<UnauthenticatedPage />} />
          
          {/* Private Routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route
              exact
              path="dashboard"
              element={<PersistentDrawerLeft mainContent={<Dashboard />} />}
            />
            <Route
              path="products"
              element={<PersistentDrawerLeft mainContent={<ProductList />} />}
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
