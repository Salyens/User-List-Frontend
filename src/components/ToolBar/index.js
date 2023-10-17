import React from "react";
import { Button, ButtonGroup, Row } from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import handleLogOut from "../../helpers/handleLogOut";

const ToolBar = ({ isChecked, onSetIsChecked, onSetUsers, onSetErrors }) => {
  const navigate = useNavigate();

  const handleApiError = (e, defaultErrorMessage) => {
    if (!e || (e.response && e.response.status === 401)) {
      handleLogOut(e, navigate);
    }
    onSetErrors([defaultErrorMessage]);
  };

  const handleUserDeletion = async () => {
    try {
      await ApiService.delete(isChecked);
      onSetUsers((prevUsers) =>
        prevUsers.filter((user) => !isChecked.includes(user._id))
      );
      onSetIsChecked([]);
      verifyLoggedInUser(true);
    } catch (e) {
      handleApiError(
        e,
        "Failed to delete selected users. Please try again later."
      );
    }
  };

  const handleUserStatusUpdate = async (blocked) => {
    try {
      await ApiService.update(blocked, isChecked);
      onSetUsers((prevUsers) =>
        prevUsers
          .map((user) =>
            isChecked.includes(user._id) ? { ...user, status: blocked } : user
          )
          .sort((a, b) => a.status - b.status)
      );
      onSetIsChecked([]);
      verifyLoggedInUser(blocked);
    } catch (e) {
      const errorMessage = `Failed to ${
        blocked ? "block" : "unblock"
      } selected users. Please try again later.`;
      handleApiError(e, errorMessage);
    }
  };

  const verifyLoggedInUser = (blocked) => {
    ApiService.getUserInfo()
      .then((res) => {
        if (res.status === 200 && blocked && isChecked.includes(res.data._id)) {
          handleLogOut("", navigate);
        }
      })
      .catch((e) => {
        handleApiError(
          e,
          "An error occurred while loading the data. Please try again later."
        );
      });
  };

  return (
    <Row>
      <div className="p-0 mt-5 mb-2">
        <ButtonGroup aria-label="User Actions">
          <Button
            variant="secondary"
            onClick={() => handleUserStatusUpdate(true)}
          >
            <span className="me-2">Block</span>
            <i className="fa-solid fa-lock"></i>
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleUserStatusUpdate(false)}
          >
            <i className="fa-solid fa-lock-open"></i>
          </Button>
          <Button variant="secondary" onClick={handleUserDeletion}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </ButtonGroup>
      </div>
    </Row>
  );
};

export default ToolBar;
