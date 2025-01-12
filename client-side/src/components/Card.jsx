import React from "react";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
  } = data;
  return (
    <section className="card mb-4">
      <Link
        to={"/"}
        className="flex gap-4 flex-col sm:flex-row items-start p-4 bg-white rounded shadow "
      >
        <img src={companyLogo} alt="" />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin />
              {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock />
              {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <FiDollarSign />
              {minPrice}-{maxPrice}k
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar />
              {postingDate}
            </span>
          </div>
          <p className="text-primary/70 text-base">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
