import React from "react";
import { MdError } from "react-icons/md";
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-red-600 text-gray-50 flex items-center gap-2 rounded-md p-3 mt-2">
      <MdError />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
