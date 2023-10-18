import React, { useState } from "react";
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import handleLogOut from "../../helpers/handleLogOut";

const ToolBar = ({ isChecked, onSetIsChecked, onSetUsers, onSetErrors }) => {
  const navigate = useNavigate();
  const [loadingAction, setLoadingAction] = useState("");

  const handleApiError = (e, defaultErrorMessage) => {
    setLoadingAction("");
    if (!e || (e.response && e.response.status === 401)) {
      handleLogOut(navigate);
    }
    onSetErrors([defaultErrorMessage]);
  };

  const handleUserDeletion = async () => {
    setLoadingAction("delete");
    try {
      await ApiService.delete(isChecked);
      onSetUsers((prevUsers) => {
        const filteredUsers = prevUsers.list.filter(
          (user) => !isChecked.includes(user._id)
        );
        return { list: filteredUsers, isLoading: false };
      });
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
    setLoadingAction(blocked ? "block" : "unblock");
    try {
      await ApiService.update(blocked, isChecked);
      onSetUsers((prevUsers) => {
        const modifiedUsers = prevUsers.list
          .map((user) =>
            isChecked.includes(user._id) ? { ...user, status: blocked } : user
          )
          .toSorted((a, b) => a.status - b.status);
        return { list: modifiedUsers, isLoading: false };
      });
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
        setLoadingAction("");
        if (res.status === 200 && blocked && isChecked.includes(res.data._id)) {
          handleLogOut(navigate);
        }
      })
      .catch((e) => {
        handleApiError(
          e,
          "An error occurred while loading the data. Please try again later."
        );
      });
  };

  const renderIcon = (iconClass, action) => {
    return loadingAction === action ? (
      <Spinner animation="border" size="sm" />
    ) : (
      <i className={iconClass}></i>
    );
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
            {renderIcon("fa-solid fa-lock", "block")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleUserStatusUpdate(false)}
          >
            {renderIcon("fa-solid fa-lock-open", "unblock")}
          </Button>
          <Button variant="secondary" onClick={handleUserDeletion}>
            {renderIcon("fa-solid fa-trash", "delete")}
          </Button>
        </ButtonGroup>
      </div>
    </Row>
  );
};

export default ToolBar;
