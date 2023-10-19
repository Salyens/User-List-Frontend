import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/users");
  }, [navigate]);
};
export default useCheckLogin;
