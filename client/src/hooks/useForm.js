import { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (validate) {
      const error = validate(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach((field) => {
      const error = validate ? validate(field, values[field]) : null;
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validateForm };
};

export default useForm;
