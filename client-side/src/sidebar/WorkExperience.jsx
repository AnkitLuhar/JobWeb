import React from "react";
import InputField from "../components/InputField";

const WorkExperience = ({ handleChange }) => {
  const handleLocationChange = (value) => {
    handleChange(value.target.value);
  };
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="allTime"
            value=""
            onChange={() => handleLocationChange("")}
          />
          <span className="checkmark"></span>Any experience
        </label>

        <InputField
          handleChange={handleLocationChange}
          value="Intership"
          title="Intership"
          name="test"
        />
        <InputField
          handleChange={handleLocationChange}
          value="Work remotely"
          title="Work remotely"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
