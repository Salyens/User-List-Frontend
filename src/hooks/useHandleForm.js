import { useState } from "react";

const useHandleForm = (initialState, serviceFunction, navigateFunction) => {
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await serviceFunction(input);
      setInput(initialState);
      navigateFunction();
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        setErrors(error.response.data.message);
      } else {
        setErrors([error.response.data.message]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { input, errors, isLoading, handleInputChange, handleSubmit };
};

export default useHandleForm;
