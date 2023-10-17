import { useState } from "react";

const useHandleForm = (initialState, serviceFunction, navigateFunction) => {
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await serviceFunction(input);
      setInput(initialState);
      navigateFunction();
    } catch (error) {
      Array.isArray(error.response.data.message)
        ? setErrors(error.response.data.message)
        : setErrors([error.response.data.message]);
    }
  };

  return { input, errors, handleInputChange, handleSubmit };
};

export default useHandleForm;
