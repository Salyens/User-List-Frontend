import React, { useState } from "react";
import UsersList from "../UsersList";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WithAuth from "../HOC/WithAuth";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import Profile from "../Auth/Profile";
import ErrorBoundary from "../HOC/ErrorBoundary";

const App = () => {
  const [errors, setErrors] = useState([]);
  return (
    <Router>
      <div className=" m-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/users"
            element={
              <WithAuth>
                <ErrorBoundary componentName="Profile">
                  <Profile onSetErrors={setErrors} />
                </ErrorBoundary>
                <ErrorBoundary componentName="UsersList">
                  <UsersList errors={errors} onSetErrors={setErrors} />
                </ErrorBoundary>
              </WithAuth>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/*"
            element={
              <h1 className="text-center text-danger">
                404 Error! Page is not found
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
