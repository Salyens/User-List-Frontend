import React from "react";
import { Button, ButtonGroup, Row } from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import handleLogOut from "../helpers/handleLogOut";

const ToolBar = ({ isChecked, onSetIsChecked, onSetUsers, onSetErrors }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!isChecked.length) return;

    try {
      await ApiService.delete(isChecked);
      onSetUsers((users) =>
        users.filter((user) => !isChecked.includes(user._id))
      );
      onSetIsChecked([]);
    } catch (e) {
      if (!e || (e.response && e.response.status === 401)) {
        handleLogOut(e, navigate);
      }

      onSetErrors(["Failed to delete selected users. Please try again later."]);
    }
  };

  const handleStatusChange = async (blocked) => {
    if (!isChecked.length) return;

    try {
      await ApiService.update(blocked, isChecked);
      onSetUsers((users) =>
        users
          .map((user) =>
            isChecked.includes(user._id) ? { ...user, status: blocked } : user
          )
          .sort((a, b) => a.status - b.status)
      );
      onSetIsChecked([]);
    } catch (e) {
      if (!e || (e.response && e.response.status === 401)) {
        handleLogOut(e, navigate);
      }

      onSetErrors([
        `Failed to ${blocked ? "block": "unblock"} selected users. Please try again later.`,
      ]);
    }
  };

  return (
    <Row>
      <div className="p-0 mt-5 mb-2">
        <ButtonGroup aria-label="User Actions">
          <Button variant="secondary" onClick={() => handleStatusChange(true)}>
            <span className="me-2">Block</span>
            <i className="fa-solid fa-lock"></i>
          </Button>
          <Button variant="secondary" onClick={() => handleStatusChange(false)}>
            <i className="fa-solid fa-lock-open"></i>
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </ButtonGroup>
      </div>
    </Row>
  );
};

export default ToolBar;
