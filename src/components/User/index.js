import { Form } from "react-bootstrap";
import React from "react";
import "./user.css";

const User = ({ isChecked, onSetIsChecked, userData }) => {
  const { _id, name, email, regDate, lastLogin, status } = userData;

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    onSetIsChecked((prevChecked) =>
      isChecked
        ? [...prevChecked, _id]
        : prevChecked.filter((user_id) => user_id !== _id)
    );
  };
  const formatDate = (milliseconds) => {
    if (!milliseconds) return "-";

    const date = new Date(milliseconds);

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime}, ${formattedDate}`;
  };

  const renderUserCells = () => {
    const values = [
      name,
      email,
      formatDate(regDate),
      formatDate(lastLogin),
      status ? "Blocked" : "Active",
    ];
    return values.map((value, index) => <td key={index}>{value}</td>);
  };

  return (
    <tr className={status ? "blocked" : ""}>
      <td>
        <Form.Check
          type="checkbox"
          aria-label="select user"
          onChange={handleCheckboxChange}
          checked={isChecked.includes(_id)}
        />
      </td>
      {renderUserCells()}
    </tr>
  );
};

export default User;
