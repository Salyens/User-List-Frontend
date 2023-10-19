import React, { useState, useEffect } from "react";
import handleLogOut from "../../../helpers/handleLogOut";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";

const Profile = ({ onSetErrors }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({ name: "", isLoading: true });

  const handleGetUserName = () => {
    ApiService.getUserInfo()
      .then((res) => {
        if (res.status === 200)
          setUserName({
            name: res.data.name,
            isLoading: false,
          });
      })
      .catch((e) => {
        if (!e || (e.response && e.response.status === 401))
          handleLogOut(navigate);

        onSetErrors([
          "An error occurred while loading the data. Please try again later.",
        ]);
      });
  };

  useEffect(() => {
    handleGetUserName();
  }, []);

  return (
    <div className="d-flex mt-2 justify-content-end align-items-center">
      <div className="me-2">
        {userName.isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          `Hello, ${userName.name}`
        )}
      </div>
      <Button onClick={() => handleLogOut(navigate)}>Log out</Button>
    </div>
  );
};

export default Profile;
