import React, { useState } from "react";
import UsersList from "../UsersList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WithAuth from "../HOC/WithAuth";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

const App = () => {
  const [isChecked, setIsChecked] = useState([]);
  const [users, setUsers] = useState([]);

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
                <UsersList
                  isChecked={isChecked}
                  onSetIsChecked={setIsChecked}
                  users={users}
                  onSetUsers={setUsers}
                />
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
