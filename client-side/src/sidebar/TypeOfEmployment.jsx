import React from "react";
import InputField from "../components/InputField";
const TypeOfEmployment = ({ handleChange }) => {
  const handleLocationChange = (value) => {
    handleChange(value.target.value);
  };
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Employment</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="allTime"
            value=""
            onChange={() => handleLocationChange("")}
          />
          <span className="checkmark"></span>Any
        </label>

        <InputField
          handleChange={handleLocationChange}
          value="Full-time"
          title="Full-time"
          name="test"
        />
        <InputField
          handleChange={handleLocationChange}
          value="Temporary"
          title="Temporary"
          name="test"
        />
        <InputField
          handleChange={handleLocationChange}
          value="Part-time"
          title="Part-time"
          name="test"
        />
      </div>
    </div>
  );
};

export default TypeOfEmployment;
