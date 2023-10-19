import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const RegAndLoginItem = ({ param, name, onInputChange, inputValue }) => {
  return (
    <InputGroup size="lg" className="mb-3 row">
      <InputGroup.Text
        id={`inputGroup-${name}`}
        className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-4 col-xxl-3 justify-content-center"
      >
        {param}
      </InputGroup.Text>
      <Form.Control
        type={name === "password" ? "password" : "text"}
        aria-label="Large"
        aria-describedby={`inputGroup-${name}`}
        name={name}
        onChange={onInputChange}
        value={inputValue}
      />
    </InputGroup>
  );
};

export default RegAndLoginItem;
