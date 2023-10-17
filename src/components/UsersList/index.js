import React, { useEffect, useState } from "react";
import User from "../User";
import Table from "react-bootstrap/Table";
import { Button, Form, Row } from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import ToolBar from "../ToolBar";
import handleLogOut from "../../helpers/handleLogOut";

const UsersList = ({ isChecked, onSetIsChecked, users, onSetUsers }) => {

  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleGetData = (apiService, setData, field) => {
    apiService()
      .then((res) => {
        if (res.status === 200) setData(res.data[field]);
      })
      .catch((e) => {
        if (!e || (e.response && e.response.status === 401)) {
          handleLogOut(e, navigate);
        }

        setErrors([
          "An error occurred while loading the data. Please try again later.",
        ]);
      });
  };

  const handleFillAll = (e) => {
    if (e.target.checked) onSetIsChecked(users.map((user) => user._id));
    else onSetIsChecked([]);
  };

  useEffect(() => {
    handleGetData(ApiService.get, onSetUsers, "users");
    handleGetData(ApiService.getUserInfo, setUserName, "name");
  }, []);

  const renderTableHeaders = () => {
    const headers = ["Name", "Email", "Reg.date", "Last login", "Status"];
    return headers.map((header, index) => (
      <th key={`th-${index}`}>{header}</th>
    ));
  };

  return (
    <div>
      <div className="d-flex mt-2 justify-content-end align-items-center">
        <div className="me-2">Hello, {userName}</div>
        <Button onClick={() => handleLogOut("", navigate)}>Log out</Button>
      </div>
      <h1 className="text-center mt-5">Users</h1>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-danger text-center">
            {error}
          </p>
        ))}

      <ToolBar
        isChecked={isChecked}
        onSetIsChecked={onSetIsChecked}
        onSetUsers={onSetUsers}
        onSetErrors={setErrors}
      />
      <Row className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>
                <Form.Check
                  type="checkbox"
                  aria-label="select user"
                  checked={isChecked.length === users.length}
                  onChange={handleFillAll}
                />
              </th>
              {renderTableHeaders()}
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <User
                  isChecked={isChecked}
                  onSetIsChecked={onSetIsChecked}
                  userData={user}
                  key={user._id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>No data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default UsersList;
