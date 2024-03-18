import { useState } from "react";

/**
 * useForm Custom Hook
 *
 * A custom hook for managing form state, validation, and submission logic.
 * This hook encapsulates the functionality needed for handling forms in React components,
 * providing a clean and reusable way to manage form-related logic.
 *
 * @param {Object} initialValues - The initial values for the form fields.
 * @param {Function} onSubmit - The callback function to be called when the form is submitted.
 * @returns {Object} An object containing form state and helper functions.
 */
const useForm = (initialValues, onSubmit) => {
  // State for form values and errors
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  /**
   * handleChange Function
   *
   * Updates the form values in response to user input.
   *
   * @param {string} name - The name of the input field.
   * @param {string} value - The new value of the input field.
   */
  const handleChange = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
  };

  /**
   * handleSubmit Function
   *
   * Handles form submission by validating form values and calling the onSubmit callback.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form values
    const validationErrors = validate(values);
    setErrors(validationErrors || {});
    // If no validation errors, call onSubmit callback with form values
    if (!validationErrors) {
      onSubmit(values);
    }
  };

  /**
   * handleClear Function
   *
   * Clears the form fields by resetting form values to initial state.
   */
  const handleClear = () => {
    setValues(initialValues);
  };

  /**
   * validate Function
   *
   * Performs validation on form values.
   *
   * @param {Object} values - The form values to be validated.
   * @returns {Object|null} An object containing validation errors, or null if no errors.
   */
  const validate = (values) => {
    const errors = {};
    // Check if 'name' field is empty
    if (!values.name) {
      errors.name = "Name is required";
    }
    // Check if 'location' field is empty
    if (!values.location) {
      errors.location = "Location is required";
    }
    // Add more validation rules as needed
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Return form state and helper functions
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleClear,
  };
};

export default useForm;
