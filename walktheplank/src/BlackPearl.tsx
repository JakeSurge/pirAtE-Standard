import React from "react";
import "./index.css";

export type BlackPearlProps = {
  image: string;
  input?: string;
};

export const BlackPearl = ({ image, input }: BlackPearlProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md flex flex-col items-center">
        <img
          src={image}
          alt="Image placeholder"
          className="w-64 h-auto object-cover"
        />
        <div className="mt-6 w-full">
          <input
            type="text"
            value={input || ""}
            onChange={(e) => console.log(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => console.log("Button clicked")}
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
