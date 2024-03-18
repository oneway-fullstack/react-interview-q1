import useForm from "../../hooks/useForm";

/**
 * NameForm Component
 *
 * A form component for capturing user input for name and location fields.
 * This component utilizes the useForm custom hook for managing form state,
 * validation, and submission logic.
 *
 * @param {Array} locations - An array of location options for the dropdown field.
 * @param {boolean} loading - A boolean indicating whether form submission is in progress.
 * @param {Object} errors - An object containing validation errors for the form fields, these come from backend.
 * @param {Function} onCreate - The callback function to be called when the form is submitted.
 * @returns {JSX.Element} The JSX markup for the NameForm component.
 */

const NameForm = ({ locations = [], loading, errors, onCreate }) => {
  const {
    values,
    errors: formErrors,
    handleChange,
    handleClear,
    handleSubmit,
  } = useForm(
    {
      name: "",
      location: "",
    },
    (values) => {
      onCreate(values);
    }
  );

  return (
    <form
      data-testid="name-form"
      className="w-full max-w-xl"
      onSubmit={handleSubmit}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-name"
          >
            Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className={`appearance-none border ${
              formErrors.name || errors.name.length
                ? "border-red-500"
                : "border-gray-200"
            } rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none`}
            id="inline-name"
            data-testid="inline-name"
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs">{formErrors.name}</p>
          )}
          {errors.name.map((error, index) => (
            <p key={index} className="text-red-500 text-xs">
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-location"
          >
            Location
          </label>
        </div>
        <div className="md:w-2/3">
          <select
            className={`appearance-none bg-white border ${
              formErrors.location || errors.location.length
                ? "border-red-500"
                : "border-gray-200"
            } rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none`}
            id="inline-location"
            data-testid="inline-location"
            value={values.location}
            onChange={(e) => handleChange("location", e.target.value)}
          >
            <option value=""></option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {formErrors.location && (
            <p className="text-red-500 text-xs">{formErrors.location}</p>
          )}
          {errors.location.map((error, index) => (
            <p key={index} className="text-red-500 text-xs">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        <button
          className="border shadow hover:bg-gray-700 hover:text-white focus:shadow-outline focus:outline-none text-gray-700 py-2 px-4 rounded"
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>

        <button
          className="flex items-center border shadow hover:bg-gray-700 hover:text-white focus:shadow-outline focus:outline-none text-gray-700 py-2 px-4 rounded"
          type="submit"
        >
          {loading && (
            <svg
              className="inline w-5 h-5 text-white animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}

          <span className="ml-1">Add</span>
        </button>
      </div>
    </form>
  );
};

export default NameForm;
