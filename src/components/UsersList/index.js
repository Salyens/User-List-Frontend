import React, { useEffect, useState } from "react";
import User from "../User";
import Table from "react-bootstrap/Table";
import { Form, Row, Spinner } from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import ToolBar from "../ToolBar";
import handleLogOut from "../../helpers/handleLogOut";
import UserNameAndLogout from "../Auth/UserNameAndLogout";

const UsersList = ({ isChecked, onSetIsChecked, users, onSetUsers }) => {
  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleGetUsers = () => {
    ApiService.get()
      .then((res) => {
        if (res.status === 200) onSetUsers(res.data.users);
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

  const handleFillAll = (e) => {
    if (e.target.checked) onSetIsChecked(users.map((user) => user._id));
    else onSetIsChecked([]);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const renderTableHeaders = () => {
    const headers = ["Name", "Email", "Reg.date", "Last login", "Status"];
    return headers.map((header, index) => (
      <th key={`th-${index}`}>{header}</th>
    ));
  };

  return (
    <div>
      <UserNameAndLogout userName={userName} onSetUserName={setUserName} />
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            ) : users.length ? (
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
                <td colSpan={5}></td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default UsersList;
