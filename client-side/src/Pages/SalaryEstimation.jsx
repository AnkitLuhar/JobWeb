import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const SalaryEstimation = () => {
  const [searchText, setSearchText] = useState("");
  const [originalSalary, setOriginalSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => {
        setOriginalSalary(data);
        setFilteredSalary(data); // Initially, display all salaries
      });
  }, [searchText]);

  const handleSearch = () => {
    const filtered = originalSalary.filter((e) =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(filtered);
    setFilteredSalary(filtered);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader />
      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            type="text"
            id="search"
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue text-white font-semibold rounded-sm mb-4 px-8 py-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {/* Display filtered salaries here */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {filteredSalary.map((data) => {
          return (
            <div className="shadow px-4 py-8" key={data.id}>
              <h4 className="font-semibold text-xl">{data.title}</h4>
              <p className="my-2 font-medium text-blue text-lg">
                {data.salary}
              </p>
              <div className=" flex flex-wrap gap-4">
                <a href="/" className="underline">
                  {data.status}
                </a>
                <a href="/" className="underline">
                  {data.skills}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalaryEstimation;
