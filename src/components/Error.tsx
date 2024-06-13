import React from "react";

const Error: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center p-2">
        <p className="font-bold text-red-600 text-capitalize">{message}</p>
      </div>
    </div>
  );
};

export default Error;
