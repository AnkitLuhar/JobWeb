import { useLoaderData, useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from "react-custom-alert";
import "react-custom-alert/dist/index.css";

const UpdateJob = () => {
  //   const history = useHistory();
  const { id } = useParams();
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/all-jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error.message);
      }
    };

    fetchData();
  }, [id]); // Dependency array includes id to refetch data if it changes

  //   const {
  //     JobTitle,
  //     _id,
  //     companyName,
  //     minPrice,
  //     maxPrice,
  //     SalaryType,
  //     jobLocation,
  //     postingDate,
  //     experienceLevel,
  //     companyLogo,
  //     employmentType,
  //     description,
  //     postedBy,
  //     skills,
  //   } = jobData;

  console.log(jobData);
  console.log(jobData.JobTitle);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { error },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    data.skills = selectedOptions; // Append selected skills to the data object
    try {
      const response = await fetch(`http://localhost:8000/update-job/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit job");
      }
      const result = await response.json();
      console.log(result);
      if (result.acknowledged) {
        toast.success("Job updated successfully");
        reset(); // Reset the form
        setSelectedOptions([]); // Clear selected options
        // history.push("/");
      }
    } catch (error) {
      console.error("Error updating job:", error.message);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "Java", label: "Java" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "C", label: "C" },
    { value: "NODE JS", label: "NODE JS" },
    { value: "REACT JS", label: "REACT JS" },
  ];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <ToastContainer floatingTime={2000} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="text"
                defaultValue={jobData.JobTitle}
                {...register("JobTitle")}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="text"
                placeholder="Ex:Google"
                defaultValue={jobData.companyName}
                {...register("companyName")}
              />
            </div>
          </div>
          {/* 2nd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="text"
                placeholder="20k"
                defaultValue={jobData.minPrice}
                {...register("minPrice")}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="text"
                placeholder="120k"
                defaultValue={jobData.maxPrice}
                {...register("maxPrice")}
              />
            </div>
          </div>
          {/* 3rd row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary type</label>
              <select
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                {...register("SalaryType")}
                defaultValue={jobData.SalaryType}
              >
                <option value="">Choose your Salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="text"
                placeholder="Ex: India"
                defaultValue={jobData.jobLocation}
                {...register("jobLocation")}
              />
            </div>
          </div>
          {/* 4th row */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="date"
                placeholder="Ex: 2024-05-11"
                defaultValue={jobData.postingDate}
                {...register("postingDate")}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                {...register("experienceLevel")}
                defaultValue={jobData.experienceLevel}
              >
                <option value="">Choose your experience</option>
                <option value="Any experience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
                <option value="Job">Job</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              defaultValue={jobData.skills}
              onChange={setSelectedOptions}
              options={options}
              isMulti
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 "
            />
          </div>

          {/* 6th row */}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                type="url"
                placeholder="Paste Your Company Logo Url ,like:https://xyz.com"
                {...register("companyLogo")}
                defaultValue={jobData.companyLogo}
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                {...register("employmentType")}
              >
                <option value="">Choose your employment</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none  placeholder:text-gray-700"
              rows={6}
              placeholder="Job Description"
              defaultValue={jobData.description}
              {...register("description")}
            />
          </div>

          {/* 8th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              placeholder="your email"
              {...register("postedBy")}
              defaultValue={jobData.postedBy}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
