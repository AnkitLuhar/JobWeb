import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    // fetch("http://localhost:8000/all-jobs")
    fetch("jobs.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Reset page when query changes
  };

  const handleClick = (value) => {
    setSelectedCategory(value); // Update selectedCategory with the clicked value
    setCurrentPage(1); // Reset page when category changes
  };
  const filteredItems = jobs.filter(
    (job) =>
      job.jobTitle && job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  //calculate the index range::(pagination):
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  //nextpage shift::
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  //previouspage shift::
  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const filterData = (jobs, selectedCategory, query) => {
    let filterjob = jobs;
    if (query) {
      filterjob = filteredItems;
    }
    if (selectedCategory) {
      filterjob = filterjob.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          return (
            (jobLocation &&
              jobLocation.toLowerCase() === selectedCategory.toLowerCase()) ||
            (maxPrice &&
              parseInt(maxPrice) <= parseInt(selectedCategory.toLowerCase())) ||
            (salaryType &&
              salaryType.toLowerCase() === selectedCategory.toLowerCase()) ||
            (employmentType &&
              employmentType.toLowerCase() ===
                selectedCategory.toLowerCase()) ||
            (experienceLevel &&
              experienceLevel.toLowerCase() ===
                selectedCategory.toLowerCase()) ||
            (postingDate && postingDate >= selectedCategory)
          );
        }
      );
    }
    //slice the data based on cuurent page::
    const { startIndex, endIndex } = calculatePageRange();
    filterjob = filterjob.slice(startIndex, endIndex);
    return filterjob.map((data, i) => <Card key={i} data={data} />);
  };
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const results = filterData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 ">
        {/* //left side,sidebar */}
        <div className="bg-white p-4 rounded">
          <Sidebar
            handleChange={handleClick}
            selectedCategory={selectedCategory}
          />
        </div>
        {/* //middle part */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : results.length > 0 ? (
            <Jobs results={results} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2 ">{results.length} Jobs</h3>
              <p>No data found!</p>
            </>
          )}

          {/* Pagination */}
          {results.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="hover:underline"
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="hover:underline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
        {/* right side */}
        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
