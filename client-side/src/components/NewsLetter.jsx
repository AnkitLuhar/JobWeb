import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
const NewsLetter = () => {
  return (
    <div>
      <div className="mb-16">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for Jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Stay updated on new job opportunities! Enter your email below to
          subscribe for job alerts.
        </p>
        <div className="w-full space-y-4 ">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@gmail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value={"Subscribe"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
      <div className="">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed Faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Ready to take the next step in your career? Upload your resume now to
          be considered for exciting job opportunities.
        </p>
        <div className="w-full space-y-4 ">
          <input
            type="submit"
            value={"Upload your resume"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
