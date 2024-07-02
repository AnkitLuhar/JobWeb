import React from "react";
import InputField from "../components/InputField";
import "../App.css";

const Location = ({ handleChange }) => {
  const handleLocationChange = (e) => {
    handleChange(e.target.value);
  };
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleLocationChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleLocationChange}
          value="London"
          title="London"
          name="test"
        />
        <InputField
          handleChange={handleLocationChange}
          value="Seattle"
          title="Seattle"
          name="test"
        />
        <InputField
          handleChange={handleLocationChange}
          value="Madrid"
          title="Madrid"
          name="test"
        />
        <InputField
          handleChange={handleLocationChange}
          value="Boston"
          title="Boston"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
