import React, { useState, useEffect } from "react";
import handleLogOut from "../../../helpers/handleLogOut";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";

const UserNameAndLogout = ({ userName, onSetUserName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

  const handleGetUserName = () => {
    ApiService.getUserInfo()
      .then((res) => {
        if (res.status === 200) onSetUserName(res.data.name);
        setIsLoading(false);
      })
      .catch((e) => {
        if (!e || (e.response && e.response.status === 401))
          handleLogOut(navigate);

        setErrors([
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
        {isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          `Hello, ${userName}`
        )}
      </div>
      <Button onClick={() => handleLogOut(navigate)}>Log out</Button>
    </div>
  );
};

export default UserNameAndLogout;
