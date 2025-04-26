import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[100px]">
      <div className="loader dark:loader-dark dark:from-gray-900 dark:to-gray-800"></div>
    </div>
  );
};

export default Loader;
