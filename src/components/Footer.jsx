import React from "react";

const Footer = () => {
  return (
    <div className="p-4">
      <hr className="border-gray-500 max-w-6xl mx-auto my-5" />
      <p className="text-center text-gray-500">
        Copyright © 2024{" "}
        <span className="italic font-bold text-gray-400">
          {" "}
          Crypto<span className="text-gray-500">Insight</span>
        </span>{" "}
        - All rights reserved
      </p>
    </div>
  );
};

export default Footer;
