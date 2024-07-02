import React from "react";

const Jobs = ({ results }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2">{results.length} Jobs</h3>
      </div>
      <section>{results}</section>
    </>
  );
};

export default Jobs;
