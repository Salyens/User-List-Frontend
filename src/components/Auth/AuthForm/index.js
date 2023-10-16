import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegAndLoginItem from "../../RegAndLoginItem";
import useHandleForm from "../../../hooks/useHandleForm";

const AuthForm = ({ fields, initialState, apiServiceFunction, title }) => {
  const navigate = useNavigate();
  const { input, errors, handleInputChange, handleSubmit } = useHandleForm(
    initialState,
    apiServiceFunction,
    () => navigate("/users")
  );


  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-3 text-center">{title}</h2>
      {errors && <p className="text-danger">{errors.join("")}</p>}
      <Form
        className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fields.map((field) => (
          <RegAndLoginItem
            param={field.param}
            name={field.name}
            key={field.name}
            onInputChange={handleInputChange}
            inputValue={input[field.name]}
          />
        ))}
        <Button className="col-4" variant="primary" onClick={handleSubmit}>
          {title}
        </Button>
      </Form>

      {title === "Sign Up" && <Link to="/login" className="text-decoration-none mt-3">Login</Link>}
      {title === "Log In" && <Link to="/registration" className="text-decoration-none mt-3">Sign Up</Link>}
    </div>
  );
};
export default AuthForm;
