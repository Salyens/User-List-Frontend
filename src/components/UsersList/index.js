import { useEffect, useState } from "react";
import User from "../User";
import Table from "react-bootstrap/Table";
import { Form, Row, Spinner } from "react-bootstrap";
import ApiService from "../../services/ApiService";
import ToolBar from "../ToolBar";
import handleLogOut from "../../helpers/handleLogOut";
import { useNavigate } from "react-router-dom";

const UsersList = ({ errors, onSetErrors }) => {
  const [isChecked, setIsChecked] = useState([]);
  const [users, setUsers] = useState({ list: [], isLoading: true });
  const navigate = useNavigate();

  const handleGetUsers = () => {
    ApiService.get()
      .then((res) => {
        if (res.status === 200)
          setUsers({ list: res.data.users, isLoading: false });
      })
      .catch((e) => {
        if (!e || (e.response && e.response.status === 401))
          handleLogOut(navigate);

        onSetErrors([
          "An error occurred while loading the data. Please try again later.",
        ]);
      });
  };

  const handleFillAll = (e) => {
    if (e.target.checked) setIsChecked(users.list.map((user) => user._id));
    else setIsChecked([]);
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
    <>
      <h1 className="text-center mt-5">Users</h1>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-danger text-center">
            {error}
          </p>
        ))}

      <ToolBar
        isChecked={isChecked}
        onSetIsChecked={setIsChecked}
        onSetUsers={setUsers}
        onSetErrors={onSetErrors}
      />

      <Row className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>
                <Form.Check
                  type="checkbox"
                  aria-label="select user"
                  checked={isChecked.length === users.list.length}
                  onChange={handleFillAll}
                />
              </th>
              {renderTableHeaders()}
            </tr>
          </thead>
          <tbody>
            {users.isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            ) : users.list.length ? (
              users.list.map((user) => (
                <User
                  isChecked={isChecked}
                  onSetIsChecked={setIsChecked}
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
    </>
  );
};

export default UsersList;
