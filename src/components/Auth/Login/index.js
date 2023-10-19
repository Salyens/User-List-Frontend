import ApiService from "../../../services/ApiService";
import AuthForm from "../AuthForm";
import useCheckLogin from "../../../hooks/useCheckLogin";

const Login = () => {
  const fields = [
    { param: "Email", name: "email" },
    { param: "Password", name: "password" },
  ];
  const initialState = { email: "", password: "" };

  useCheckLogin();

  return (
    <AuthForm
      title="Log In"
      fields={fields}
      initialState={initialState}
      apiServiceFunction={ApiService.login}
    />
  );
};
export default Login;
