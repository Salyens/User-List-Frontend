import useCheckLogin from "../../../hooks/useCheckLogin";
import ApiService from "../../../services/ApiService";
import AuthForm from "../AuthForm";

const Registration = () => {
  const fields = [
    { param: "User name", name: "name" },
    { param: "Email", name: "email" },
    { param: "Password", name: "password" },
  ];
  const initialState = { name: "", email: "", password: "" };

  useCheckLogin();

  return (
    <AuthForm
      title="Sign Up"
      fields={fields}
      initialState={initialState}
      apiServiceFunction={ApiService.registration}
    />
  );
};
export default Registration;
