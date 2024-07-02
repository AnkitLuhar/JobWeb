import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingData from "../components/JobPostingData";
import WorkExperience from "./WorkExperience";
import TypeOfEmployment from "./TypeOfEmployment";

const Sidebar = ({ handleChange, selectedCategory }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Location
        handleChange={handleChange}
        selectedCategory={selectedCategory}
      />
      <Salary handleChange={handleChange} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <TypeOfEmployment handleChange={handleChange} />
    </div>
  );
};

export default Sidebar;
