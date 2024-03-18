import "./App.css";
import { useEffect, useState } from "react";
import NameForm from "./components/NameForm";
import NameList from "./components/NameList";
import { getLocations, isNameValid } from "./mock-api/apis";

function App() {
  const [locations, setLocations] = useState([]);
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState({ name: [], location: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocations().then((data) => setLocations(data));
  }, []);

  const handleListAdd = async (values) => {
    const errors = { name: [], location: [] };
    setLoading(true);

    try {
      // Validation
      const isValidName = await isNameValid(values.name);
      if (!isValidName) {
        errors.name.push("Invalid name");
      }
      const nameExists = list.find((item) => item.name === values.name);
      if (nameExists) {
        errors.name.push("This name has already been taken");
      }

      setErrors(errors);
      if (errors.name.length || errors.location.length) {
        return;
      }

      setList((prev) => {
        return [...prev, values];
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <NameForm
        locations={locations}
        onCreate={handleListAdd}
        errors={errors}
        loading={loading}
      />
      <NameList list={list} />
    </div>
  );
}

export default App;
